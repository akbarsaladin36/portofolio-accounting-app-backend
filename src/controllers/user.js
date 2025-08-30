const helper = require('../helper')
const userService = require('../services/user')

class UserController {
    async FindUsersController(req, res) {
        try {
            const users = await userService.FindAllService()
            if(users) {
                return helper.statusResponse(res, 200, 'All users are appeared!', users)
            } else {
                return helper.statusResponse(res, 200, 'All users are empty!', null)
            }
        } catch(error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async FindUserController(req, res) {
        try {
            const { username } = req.params
            const user = await userService.FindOneService(username)
            if(user) {
                return helper.statusResponse(res, 200, `A user ${username} are found!`, user)
            } else {
                return helper.statusResponse(res, 400, `A user ${username} are not found!`, null)
            }
        } catch(error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async CreateUserController(req, res) {
        try {
            const { username, email, password, confirmPassword, firstName, lastName, address, phoneNumber } = req.body
            const currentUser = req.currentUser
            const user = await userService.FindOneService(username)
            if(password != confirmPassword) {
                return helper.statusResponse(res, 400, `A password is not match!`, null)
            }
            if(user) {
                return helper.statusResponse(res, 200, `A user ${username} are registered!`, user)
            } else {
                const hashedPassword = helper.hashPassword(password)
                const setData = {
                    user_uuid: helper.generateUuid(),
                    user_username: username,
                    user_email: email,
                    user_password: hashedPassword,
                    user_first_name: firstName,
                    user_last_name: lastName,
                    user_address: address,
                    user_phone_number: phoneNumber,
                    user_status_cd: 'active',
                    user_role: 'user',
                    user_created_date: new Date(Date.now()),
                    user_created_user_uuid: currentUser.user_uuid,
                    user_created_username: currentUser.username
                }
                const result = await userService.CreateService(setData)
                return helper.statusResponse(res, 200, 'A new user is succesfully created!', result)
            }
        } catch(error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async UpdateUserController(req, res) {
        try {
            const { username } = req.params
            const { firstName, lastName, address, phoneNumber } = req.body
            const currentUser = req.currentUser
            const user = await userService.FindOneService(username)
            if(user) {
                const setData = {
                    user_first_name: firstName,
                    user_last_name: lastName,
                    user_address: address,
                    user_phone_number: phoneNumber,
                    user_updated_date: new Date(Date.now()),
                    user_updated_user_uuid: currentUser.user_uuid,
                    user_updated_username: currentUser.username
                }
                const result = await userService.UpdateService(setData, username)
                return helper.statusResponse(res, 200, 'A new user is succesfully updated!', result)
            } else {
                return helper.statusResponse(res, 400, `A user ${username} are not found!`, null)
            }
        } catch(error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async DeleteUserController(req, res) {
        try {
            const { username } = req.params
            const user = await userService.FindOneService(username)
            if(user) {
                await userService.DeleteService(username)
                return helper.statusResponse(res, 200, 'A new user is succesfully deleted!', null)
            } else {
                return helper.statusResponse(res, 400, `A user ${username} are not found!`, null)
            }
        } catch(error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

}

module.exports = new UserController()