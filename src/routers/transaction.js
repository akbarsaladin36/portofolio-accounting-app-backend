const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const transactionController = require('../controllers/transaction')

router.get("/", authMiddleware.userAuthentication, authMiddleware.userRole("admin"), transactionController.FindTransactionsController)
router.get("/my-transactions", authMiddleware.userAuthentication, transactionController.FindTransactionsByUserIdController)
router.get("/detail-transaction/:transactionCode", authMiddleware.userAuthentication, transactionController.FindTransactionController)
router.post("/", authMiddleware.userAuthentication, transactionController.CreateTransactionController)
router.patch("/detail-transaction/:transactionCode", authMiddleware.userAuthentication, transactionController.UpdateTransactionController)
router.delete("/detail-transaction/:transactionCode", authMiddleware.userAuthentication, transactionController.DeleteTransactionController)

module.exports = router