const accountRepository = require('../repositories/account')

class AccountService {
    async FindAllService() {
        return await accountRepository.FindAll()
    }

    async FindAllByParentCodeService(accountParentCode) {
        return await accountRepository.FindAllByParentCode(accountParentCode)
    }

    async FindOneService(accountCode) {
        return await accountRepository.FindOne(accountCode)
    }

    async CreateService(setData) {
        return await accountRepository.Create(setData)
    }

    async UpdateService(setData, accountCode) {
        return await accountRepository.Update(setData, accountCode)
    }

    async DeleteService(accountCode) {
        return await accountRepository.Delete(accountCode)
    }
}

module.exports = new AccountService()