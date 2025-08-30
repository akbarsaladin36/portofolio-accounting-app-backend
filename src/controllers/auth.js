const authService = require('../services/auth')
const helper = require('../helper')
const jwt = require('jsonwebtoken')

class AuthController {

    async RegisterController(req, res) {
        try {
            const { username, email, password, confirmPassword } = req.body
            if(password != confirmPassword) {
                return helper.statusResponse(res, 400, 'Password is not match with confirm password! Please try again!', null)
            } else {
                const checkUsername = await authService.FindUsernameService(username)
                if(checkUsername) {
                    return helper.statusResponse(res, 400, 'A username is registered on app! Please try find a new username', null)
                } else {
                    const hashedPassword = helper.hashPassword(password)
                    const userUUID = helper.generateUuid()
                    const setData = {
                        user_uuid: userUUID,
                        user_username: username,
                        user_email: email,
                        user_password: hashedPassword,
                        user_role: 'user',
                        user_status_cd: 'active',
                        user_created_date: new Date(Date.now()),
                        user_created_user_uuid: userUUID,
                        user_created_username: username
                    }
                    const result = await authService.CreateService(setData)
                    return helper.statusResponse(res, 200, 'A new user is succesfully registered!', result)
                }
            }
        } catch(error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async LoginController(req, res) {
        try {
            const { username, password } = req.body
            const checkUsername = await authService.FindUsernameService(username)
            if(checkUsername) {
                const checkPassword = helper.checkPassword(password, checkUsername.user_password)
                if(checkPassword) {
                    const payload = {
                        user_uuid: checkUsername.user_uuid,
                        username: checkUsername.user_username,
                        email: checkUsername.user_email,
                        role: checkUsername.user_role
                    }
                    const token = jwt.sign({...payload}, process.env.JWT_SECRETKEY, {
                        expiresIn: process.env.JWT_EXPIRESTIME
                    })
                    const loginResult = {...payload, token}
                    return helper.statusResponse(res, 200, 'User is successfully logged in!', loginResult)
                } else {
                    return helper.statusResponse(res, 400, 'A password is not match! Please try again!', null)
                }
            } else {
                return helper.statusResponse(res, 400, 'A user is not registered in app! Please register now!', null)
            }
        } catch(error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

}

module.exports = new AuthController()