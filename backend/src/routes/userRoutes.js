const express = require('express')

const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
const allowRoles = require('../middleware/permissions')

const router = express.Router()

router.get(
  '/',
  auth,
  allowRoles('admin'),
  userController.getAllUsers
)

router.get(
  '/:id',
  auth,
  userController.getUserById
)

router.put(
  '/:id',
  auth,
  userController.updateUser
)

router.delete(
  '/:id',
  auth,
  allowRoles('admin'),
  userController.deleteUser
)

module.exports = router