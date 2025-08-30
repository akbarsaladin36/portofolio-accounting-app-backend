const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const userController = require('../controllers/user')

router.get("/", authMiddleware.userAuthentication, authMiddleware.userRole('admin'), userController.FindUsersController)
router.get("/:username", authMiddleware.userAuthentication, authMiddleware.userRole('admin'), userController.FindUserController)
router.post("/", authMiddleware.userAuthentication, authMiddleware.userRole('admin'), userController.CreateUserController)
router.patch("/:username", authMiddleware.userAuthentication, authMiddleware.userRole('admin'), userController.UpdateUserController)
router.delete("/:username", authMiddleware.userAuthentication, authMiddleware.userRole('admin'), userController.DeleteUserController)

module.exports = router