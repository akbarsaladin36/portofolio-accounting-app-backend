const journalRepository = require('../repositories/journalEntry')

class JournalEntryService {
    async FindAllService() {
        return await journalRepository.FindAll()
    }

    async FindByUserIdService(userId) {
        return await journalRepository.FindByUserId(userId)
    }

    async FindOneService(journalCode) {
        return await journalRepository.FindOne(journalCode)
    }

    async CreateService(setData) {
        return await journalRepository.Create(setData)
    }

    async UpdateService(setData, journalCode) {
        return await journalRepository.Update(setData, journalCode)  
    }

    async DeleteService(journalCode) {
        return await journalRepository.Delete(journalCode)
    }
}

module.exports = new JournalEntryService()