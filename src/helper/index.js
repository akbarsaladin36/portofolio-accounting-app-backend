const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const slugify = require('slugify')

const helper = {
    statusResponse(res, status, message, data) {
        return res.status(status).json({ status: status, message: message, data: data })
    },
    hashPassword(password) {
        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(password, salt)
        return encryptPassword
    },
    checkPassword(bodyPassword, dataPassword) {
        const checkPassword = bcrypt.compareSync(bodyPassword, dataPassword)
        return checkPassword
    },
    generateUuid() {
        const uuid = uuidv4()
        const uuidWithoutHyphens = uuid.replace(/-/g, '')
        return uuidWithoutHyphens
    },
    getDateNow() {
        const date = new Date(Date.now())
        const formattedDate = date.toISOString().replace('T', ' ').split('.')[0]
        return formattedDate
    },
    generateSlug(str) {
        const slugStr = slugify(str, {
            lower: true,
            strict: false
        })
        return slugStr
    },
    generateJournalCode(transactionDate) {
        const transactionCode = Math.floor(10000 + Math.random() * 90000);
        const formatJournalCode = `JA-${transactionDate}-${transactionCode}`
        return formatJournalCode
    }
}

module.exports = helper