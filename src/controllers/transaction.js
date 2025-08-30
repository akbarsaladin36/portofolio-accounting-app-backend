const transactionService = require('../services/transaction')
const helper = require('../helper')

class TransactionController {
    async FindTransactionsController(req, res) {
        try {
            const transactions = await transactionService.FindAllService()
            if(transactions.length > 0) {
                return helper.statusResponse(res, 200, 'All transactions are appeared!', transactions)
            } else {
                return helper.statusResponse(res, 200, 'All transactions are empty!', null)
            }
        } catch (error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async FindTransactionsByUserIdController(req, res) {
        try {
            const userId = req.currentUser.userId
            const transactions = await transactionService.FindByUserIdService(userId)
            if(transactions.length > 0) {
                return helper.statusResponse(res, 200, 'All transactions by user are appeared!', transactions)
            } else {
                return helper.statusResponse(res, 200, 'All transactions by user are empty!', null)
            }
        } catch (error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async FindTransactionController(req, res) {
        try {
            const { transactionCode } = req.params
            const transaction = await transactionService.FindOneService(transactionCode)
            if(transaction) {
                return helper.statusResponse(res, 200, `A transaction ${transactionCode} are succesfully appeared!`, transaction)
            } else {
                return helper.statusResponse(res, 200, `A transaction ${transactionCode} are not found!`, null)
            }
        } catch (error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async CreateTransactionController(req, res) {
        try {
            const { contactCode, transactionCode, transactionAmount, transactionDescription, transactionReference } = req.body
            const currentUser = req.currentUser
            const checkTransaction = await transactionService.FindOneService(transactionCode)
            if(checkTransaction) {
                return helper.statusResponse(res, 400, `A transaction ${transactionCode} are exist!`, null)
            } else {
                const setData = {
                    contact_code: contactCode,
                    transaction_code: transactionCode,
                    transaction_date: new Date(Date.now()),
                    transaction_amount: transactionAmount,
                    transaction_description: transactionDescription,
                    transaction_reference: transactionReference,
                    transaction_status_cd: 'pending',
                    transaction_created_date: new Date(Date.now()),
                    transaction_created_user_uuid: currentUser.user_uuid,
                    transaction_created_username: currentUser.username,
                }
                const result = await transactionService.CreateService(setData)
                return helper.statusResponse(res, 200, 'A new transaction is succesfully created!', result)
            }
        } catch (error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async UpdateTransactionController(req, res) {
        try {
            const { transactionCode } = req.params
            const { transactionAmount, transactionDescription, transactionReference, transactionStatusCd } = req.body
            const currentUser = req.currentUser
            const transaction = await transactionService.FindOneService(transactionCode)
            if(transaction) {
                const setData = {
                    transaction_amount: transactionAmount ? transactionAmount : transaction.transaction_amount,
                    transaction_description: transactionDescription ? transactionDescription : transaction.transaction_description,
                    transaction_reference: transactionReference ? transactionReference : transaction.transaction_reference,
                    transaction_status_cd: transactionStatusCd ? transactionStatusCd : transaction.transaction_status_cd,
                    transaction_updated_date: new Date(Date.now()),
                    transaction_updated_user_uuid: currentUser.user_uuid,
                    transaction_updated_username: currentUser.username,
                }
                const result = await transactionService.UpdateService(setData, transactionCode)
                return helper.statusResponse(res, 200, `A transaction ${transactionCode} are succesfully updated!`, result)
            } else {
                return helper.statusResponse(res, 400, `A transaction ${transactionCode} are not found!`, null)
            }
        } catch (error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async DeleteTransactionController(req, res) {
        try {
            const { transactionCode } = req.params
            const transaction = await transactionService.FindOneService(transactionCode)
            if(transaction) {
                await transactionService.DeleteService(transactionCode)
                return helper.statusResponse(res, 200, `A transaction ${transactionCode} are succesfully deleted!`, null)
            } else {
                return helper.statusResponse(res, 400, `A transaction ${transactionCode} are not found!`, null)
            }
        } catch (error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }
}

module.exports = new TransactionController()