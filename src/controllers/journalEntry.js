const helper = require('../helper')
const journalService = require('../services/journalEntry')
const { format } = require('date-fns');

class JournalEntryController {
    async FindJournalsController(req, res) {
        try {
            const journals = await journalService.FindAllService()
            if(journals.length > 0) {
                return helper.statusResponse(res, 200, 'All journals are succesfully appeared!', journals)
            } else {
                return helper.statusResponse(res, 200, 'All journals are empty!', null)
            }
        } catch (error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async FindJournalsByUserIdController(req, res) {
        try {
            const userId = req.currentUser.user_uuid
            const journals = await journalService.FindByUserIdService(userId)
            if(journals.length > 0) {
                return helper.statusResponse(res, 200, 'All journals by user are succesfully appeared!', journals)
            } else {
                return helper.statusResponse(res, 200, 'All journals by user are empty!', null)
            } 
        } catch (error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async FindJournalController(req, res) {
        try {
            const { journalCode } = req.params
            const journal = await journalService.FindOneService(journalCode)
            if(journal) {
                return helper.statusResponse(res, 200, `A journal code ${journalCode} are succesfully found!`, journal)
            } else {
                return helper.statusResponse(res, 400, `A journal code ${journalCode} are not found!`, null)
            }
        } catch (error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async CreateJournalController(req, res) {
        try {
            const { accountCode, transactionCode, journalAmount, journalType, journalDescription } = req.body
            const formattedDate = format(new Date(Date.now()), 'yyyyMMdd');
            const journalCode = helper.generateJournalCode(formattedDate)
            const currentUser = req.currentUser
            const checkJournal = await journalService.FindOneService(journalCode)
            if(checkJournal) {
                return helper.statusResponse(res, 400, `A journal code ${journalCode} are exist!`, null)
            } else {
                const setData = {
                    account_code: accountCode,
                    transaction_code: transactionCode,
                    journal_code: journalCode,
                    journal_amount: journalAmount,
                    journal_type: journalType,
                    journal_description: journalDescription,
                    journal_status_cd: 'pending',
                    journal_created_date: new Date(Date.now()),
                    journal_created_user_uuid: currentUser.user_uuid,
                    journal_created_username: currentUser.username
                }
                const result = await journalService.CreateService(setData)
                return helper.statusResponse(res, 200, `A new journal is succesfully created!`, result)
            }
        } catch (error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async UpdateJournalController(req, res) {
        try {
            const { journalCode } = req.params
            const { journalAmount, journalType, journalDescription, journalStatusCd } = req.body
            const currentUser = req.currentUser
            const journal = await journalService.FindOneService(journalCode)
            if(journal) {
                const setData = {
                    journal_amount: journalAmount ? journalAmount : journal.journal_amount,
                    journal_type: journalType ? journalType : journal.journal_type,
                    journal_description: journalDescription ? journalDescription : journal.journal_description,
                    journal_status_cd: journalStatusCd ? journalStatusCd : journal.journal_status_cd,
                    journal_updated_date: new Date(Date.now()),
                    journal_updated_user_uuid: currentUser.user_uuid,
                    journal_updated_username: currentUser.username
                }
                const result = await journalService.UpdateService(setData, journalCode)
                return helper.statusResponse(res, 200, `A journal code ${journalCode} are succesfully updated!`, result)
            } else {
                return helper.statusResponse(res, 400, `A journal code ${journalCode} are not found!`, null)
            }
        } catch (error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async DeleteJournalController(req, res) {
        try {
            const { journalCode } = req.params
            const journal = await journalService.FindOneService(journalCode)
            if(journal) {
                await journalService.DeleteService(journalCode)
                return helper.statusResponse(res, 200, `A journal code ${journalCode} are succesfully deleted!`, null)
            } else {
                return helper.statusResponse(res, 400, `A journal code ${journalCode} are not found!`, null)
            }
        } catch (error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }
}

module.exports = new JournalEntryController()