const contactRepository = require('../repositories/contact')

class ContactService {
    async FindAllService() {
        return await contactRepository.FindAll()
    }

    async FindByUserIdService(userId) {
        return await contactRepository.FindByUserId(userId)
    }

    async FindOneService(contactCode) {
        return await contactRepository.FindOne(contactCode)
    }

    async CreateService(setData) {
        return await contactRepository.Create(setData)
    }

    async UpdateService(setData, contactCode) {
        return await contactRepository.Update(setData, contactCode)
    }

    async DeleteService(contactCode) {
        return await contactRepository.Delete(contactCode)
    }
}

module.exports = new ContactService()