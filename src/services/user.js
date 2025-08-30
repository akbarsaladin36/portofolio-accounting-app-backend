const userRepository = require('../repositories/user')

class UserService {
    async FindAllService() {
        return await userRepository.FindAll()
    }

    async FindOneService(username) {
        return await userRepository.FindOne(username)
    }

    async CreateService(setData) {
        return await userRepository.Create(setData)
    }

    async UpdateService(setData, username) {
        return await userRepository.Update(setData, username)
    }

    async DeleteService(username) {
        return await userRepository.Delete(username)
    }
}

module.exports = new UserService()