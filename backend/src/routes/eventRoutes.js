const express = require('express')

const eventController = require('../controllers/eventController')
const auth = require('../middleware/auth')
const allowRoles = require('../middleware/permissions')

const router = express.Router()

router.get(
  '/',
  auth,
  eventController.getAllEvents
)

router.get(
  '/mine',
  auth,
  allowRoles('host', 'admin'),
  eventController.getMyEvents
)

router.get(
  '/:id',
  auth,
  eventController.getEventById
)

router.post(
  '/',
  auth,
  allowRoles('host', 'admin'),
  eventController.createEvent
)

router.put(
  '/:id',
  auth,
  allowRoles('host', 'admin'),
  eventController.updateEvent
)

router.delete(
  '/:id',
  auth,
  allowRoles('host', 'admin'),
  eventController.deleteEvent
)

module.exports = router