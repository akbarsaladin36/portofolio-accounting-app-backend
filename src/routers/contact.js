const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const contactController = require('../controllers/contact')

router.get("/", authMiddleware.userAuthentication, authMiddleware.userRole("admin"), contactController.FindContactsController)
router.get("/my-contacts", authMiddleware.userAuthentication, authMiddleware.userRole("user"), contactController.FindContactsByUserIdController)
router.get("/:contactCode", authMiddleware.userAuthentication, contactController.FindContactController)
router.post("/", authMiddleware.userAuthentication, contactController.CreateContactController)
router.patch("/:contactCode", authMiddleware.userAuthentication, contactController.UpdateContactController)
router.delete("/:contactCode", authMiddleware.userAuthentication, contactController.DeleteContactController)

module.exports = router