const transactionRepository = require('../repositories/transaction')

class TransactionService {
    async FindAllService() {
        return await transactionRepository.FindAll()
    }

    async FindByUserIdService(userId) {
        return await transactionRepository.FindByUserId(userId)
    }

    async FindOneService(transactionCode) {
        return await transactionRepository.FindOne(transactionCode)
    }

    async CreateService(setData) {
        return await transactionRepository.Create(setData)
    }

    async UpdateService(setData, transactionCode) {
        return await transactionRepository.Update(setData, transactionCode)  
    }

    async DeleteService(transactionCode) {
        return await transactionRepository.Delete(transactionCode)
    }
}

module.exports = new TransactionService()