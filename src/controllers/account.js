const accountService = require('../services/account')
const helper = require('../helper')

class AccountController {
    async FindAccountsController(req, res) {
        try {
            const accounts = await accountService.FindAllService()
            if(accounts.length > 0) {
                return helper.statusResponse(res, 200, 'All accounts are appeared!', accounts)
            } else {
                return helper.statusResponse(res, 200, 'All accounts are empty!', null)
            }
        } catch (error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async FindAccountsByParentCodeController(req, res) {
        try {
            const { accountParentCode } = req.params
            const accounts = await accountService.FindAllByParentCodeService(accountParentCode)
            if(accounts.length > 0) {
                return helper.statusResponse(res, 200, `All accounts by parent code ${accountParentCode} are appeared!`, accounts)
            } else {
                return helper.statusResponse(res, 200, `All accounts by parent code ${accountParentCode} are empty!`, null)
            }
        } catch (error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async FindAccountController(req, res) {
        try {
            const { accountCode } = req.params
            const account = await accountService.FindOneService(accountCode)
            if(account) {
                return helper.statusResponse(res, 200, `A account ${accountCode} are found!`, account)
            } else {
                return helper.statusResponse(res, 400, `A account ${accountCode} are not found!`, null)
            }
        } catch (error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async CreateAccountController(req, res) {
        try {
            const { accountCode, accountName, accountParentCode, accountOpeningBalance, accountDescription } = req.body
            const currentUser = req.currentUser
            const checkAccount = await accountService.FindOneService(accountCode)
            if(checkAccount) {
                return helper.statusResponse(res, 200, `A account ${accountCode} are registered!`, null)
            } else {
                const setData = {
                    account_code: accountCode,
                    account_name: accountName,
                    account_parent_code: accountParentCode,
                    account_opening_balance: accountOpeningBalance,
                    account_description: accountDescription,
                    account_status_cd: 'active',
                    account_created_date: new Date(Date.now()),
                    account_created_user_uuid: currentUser.user_uuid,
                    account_created_username: currentUser.username,
                }
                const result = await accountService.CreateService(setData)
                return helper.statusResponse(res, 200, 'A new account are succesfully created!', result)
            }
        } catch (error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async UpdateAccountController(req, res) {
        try {
            const { accountCode } = req.params
            const { updateAccountCode, accountName, accountParentCode, accountOpeningBalance, accountDescription } = req.body
            const currentUser = req.currentUser
            const account = await accountService.FindOneService(accountCode)
            if(account) {
                const setData = {
                    account_code: updateAccountCode,
                    account_name: accountName,
                    account_parent_code: accountParentCode,
                    account_opening_balance: accountOpeningBalance,
                    account_description: accountDescription,
                    account_updated_date: new Date(Date.now()),
                    account_updated_user_uuid: currentUser.user_uuid,
                    account_updated_username: currentUser.username,
                }
                const result = await accountService.UpdateService(setData, accountCode)
                return helper.statusResponse(res, 200, `A account ${accountCode} data are succesfully updated!`, result)
            } else {
                return helper.statusResponse(res, 400, `A account ${accountCode} are not found!`, null)
            }
        } catch (error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async DeleteAccountController(req, res) {
        try {
            const { accountCode } = req.params
            const account = await accountService.FindOneService(accountCode)
            if(account) {
                await accountService.DeleteService(accountCode)
                return helper.statusResponse(res, 200, `A account ${accountCode} are succesfully deleted!`, null)
            } else {
                return helper.statusResponse(res, 400, `A account ${accountCode} are not found!`, null)
            }
        } catch (error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }
}

module.exports = new AccountController()