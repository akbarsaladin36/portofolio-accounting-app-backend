const helper = require('../helper')
const contactService = require('../services/contact')

class ContactController {
    async FindContactsController(req, res) {
        try {
            const contacts = await contactService.FindAllService()
            if(contacts.length > 0) {
                return helper.statusResponse(res, 200, 'All contacts are appeared!', contacts)
            } else {
                return helper.statusResponse(res, 200, 'All contacts are empty!', null)
            }
        } catch(error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async FindContactsByUserIdController(req, res) {
        try {
            const userId = req.currentUser.user_uuid
            const contacts = await contactService.FindByUserIdService(userId)
            if(contacts.length > 0) {
                return helper.statusResponse(res, 200, 'All contacts are by user appeared!', contacts)
            } else {
                return helper.statusResponse(res, 200, 'All contacts are empty!', null)
            }
        } catch(error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async FindContactController(req, res) {
        try {
            const { contactCode } = req.params
            const contact = await contactService.FindOneService(contactCode)
            if(contact) {
                return helper.statusResponse(res, 200, `A contact ${contactCode} are found!`, contact)
            } else {
                return helper.statusResponse(res, 400, `A contact ${contactCode} are not found!`, null)
            }
        } catch(error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async CreateContactController(req, res) {
        try {
            const { contactUserUUID, contactName, contactEmail, contactAddress, contactPhone, contactType } = req.body
            const currentUser = req.currentUser
            const contactCode = helper.generateSlug(contactName)
            const contact = await contactService.FindOneService(contactCode)
            if(contact) {
                return helper.statusResponse(res, 400, `A contact ${contactCode} are registered!`, null)
            } else {
                const setData = {
                    user_uuid: contactUserUUID,
                    contact_code: contactCode,
                    contact_name: contactName,
                    contact_email: contactEmail,
                    contact_address: contactAddress,
                    contact_phone: contactPhone,
                    contact_type: contactType,
                    contact_created_date: new Date(Date.now()),
                    contact_created_user_uuid: currentUser.user_uuid,
                    contact_created_username: currentUser.username,
                }
                const result = await contactService.CreateService(setData)
                return helper.statusResponse(res, 200, `A new contact have been created!`, result)
            }
        } catch(error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async UpdateContactController(req, res) {
        try {
            const { contactCode } = req.params
            const { contactName, contactEmail, contactAddress, contactPhone, contactType } = req.body
            const currentUser = req.currentUser
            const contact = await contactService.FindOneService(contactCode)
            if(contact) {
                const setData = {
                    contact_code: helper.generateSlug(contactName),
                    contact_name: contactName,
                    contact_email: contactEmail,
                    contact_address: contactAddress,
                    contact_phone: contactPhone,
                    contact_type: contactType,
                    contact_updated_date: new Date(Date.now()),
                    contact_updated_user_uuid: currentUser.user_uuid,
                    contact_updated_username: currentUser.username,
                }
                const result = await contactService.UpdateService(setData, contactCode)
                return helper.statusResponse(res, 200, `A contact ${contactCode} data are succesfully updated!`, result)
            } else {
                return helper.statusResponse(res, 400, `A contact ${contactCode} are not found!`, null)
            }
        } catch(error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }

    async DeleteContactController(req, res) {
        try {
            const { contactCode } = req.params
            const contact = await contactService.FindOneService(contactCode)
            if(contact) {
                await contactService.DeleteService(contactCode)
                return helper.statusResponse(res, 200, `A contact ${contactCode} are succesfully deleted!`, null)
            } else {
                return helper.statusResponse(res, 400, `A contact ${contactCode} are not found!`, null)
            }
        } catch(error) {
            return helper.statusResponse(res, 500, error.message, null)
        }
    }
}

module.exports = new ContactController()