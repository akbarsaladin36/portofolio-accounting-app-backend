const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const journalEntriesController = require('../controllers/journalEntry')

router.get("/", authMiddleware.userAuthentication, authMiddleware.userRole("admin"), journalEntriesController.FindJournalsController)
router.get("/my-journals", authMiddleware.userAuthentication, authMiddleware.userRole("user"), journalEntriesController.FindJournalsByUserIdController)
router.get("/detail-journal/:journalCode", authMiddleware.userAuthentication, journalEntriesController.FindJournalController)
router.post("/", authMiddleware.userAuthentication, journalEntriesController.CreateJournalController)
router.patch("/detail-journal/:journalCode", authMiddleware.userAuthentication, journalEntriesController.UpdateJournalController)
router.delete("/detail-journal/:journalCode", authMiddleware.userAuthentication, journalEntriesController.DeleteJournalController)

module.exports = router