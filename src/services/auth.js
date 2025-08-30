const authRepository = require('../repositories/auth')

class AuthService {
    async FindUsernameService(username) {
        return await authRepository.FindUsername(username)
    }

    async CreateService(setData) {
        return await authRepository.Create(setData)
    }
}

module.exports = new AuthService()