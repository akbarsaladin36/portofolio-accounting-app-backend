const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router.post("/register", authController.RegisterController)
router.post("/login", authController.LoginController)

module.exports = router