const express = require('express')

const rsvpController = require('../controllers/rsvpController')
const auth = require('../middleware/auth')
const allowRoles = require('../middleware/permissions')

const router = express.Router()

router.get(
  '/event/:eventId',
  auth,
  allowRoles('host', 'admin'),
  rsvpController.getRsvpsByEvent
)

router.get(
  '/confirmation/:confirmationNumber',
  rsvpController.getRsvpByConfirmation
)

router.post(
  '/event/:eventId',
  rsvpController.createRsvp
)

router.put(
  '/:id',
  auth,
  rsvpController.updateRsvp
)

router.patch(
  '/:id/cancel',
  auth,
  rsvpController.cancelRsvp
)

module.exports = router