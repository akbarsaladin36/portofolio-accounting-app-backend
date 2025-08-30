const jwt = require('jsonwebtoken')
const helper = require('../helper')

const AuthMiddleware = {
    userAuthentication(req, res, next) {
        let token = req.headers.authorization
        if (token) {
          token = token.split(' ')[1]
          // validating token process
          jwt.verify(token, process.env.JWT_SECRETKEY, (error, result) => {
            if (
              (error && error.name === 'JsonWebTokenError') ||
              (error && error.name === 'TokenExpiredError')
            ) {
              return helper.statusResponse(res, 403, error.message, null)
            } else {
              req.currentUser = result
              next()
            }
          })
        } else {
          return helper.statusResponse(res, 403, 'Please login first to website!', null)
        }
    },
    userRole(role) {
      return (req, res, next) => {
        const currentUser = req.currentUser
        if(role == currentUser.role) {
          next()
        } else {
          return helper.statusResponse(res, 403, `This url can be accessed by ${role}`, null)
        }
      }
    }
}

module.exports = AuthMiddleware