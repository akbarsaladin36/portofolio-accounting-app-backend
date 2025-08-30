const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const accountController = require('../controllers/account')

router.get("/", authMiddleware.userAuthentication, authMiddleware.userRole("admin"), accountController.FindAccountsController)
router.get("/parent-code/:accountParentCode", authMiddleware.userAuthentication, authMiddleware.userRole("admin"), accountController.FindAccountsByParentCodeController)
router.get("/:accountCode", authMiddleware.userAuthentication, authMiddleware.userRole("admin"), accountController.FindAccountController)
router.post("/", authMiddleware.userAuthentication, authMiddleware.userRole("admin"), accountController.CreateAccountController)
router.patch("/:accountCode", authMiddleware.userAuthentication, authMiddleware.userRole("admin"), accountController.UpdateAccountController)
router.delete("/:accountCode", authMiddleware.userAuthentication, authMiddleware.userRole("admin"), accountController.DeleteAccountController)

module.exports = router