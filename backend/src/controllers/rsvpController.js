const rsvpRepository = require('../repositories/rsvpRepository')
const eventRepository = require('../repositories/eventRepository')
const auditRepository = require('../repositories/auditRepository')

async function getRsvpsByEvent(req, res, next) {
  try {
    const event = await eventRepository.findById(req.params.eventId)

    if (!event) {
      return res.status(404).json({
        message: 'Event not found'
      })
    }

    if (
      event.host_id !== req.user.user_id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        message: 'You do not have permission to view these RSVPs'
      })
    }

    const rsvps = await rsvpRepository.findByEventId(
      req.params.eventId
    )

    res.status(200).json({
      rsvps
    })
  } catch (error) {
    next(error)
  }
}

async function getRsvpByConfirmation(req, res, next) {
  try {
    const rsvp = await rsvpRepository.findByConfirmationNumber(
      req.params.confirmationNumber
    )

    if (!rsvp) {
      return res.status(404).json({
        message: 'RSVP not found'
      })
    }

    res.status(200).json({
      rsvp
    })
  } catch (error) {
    next(error)
  }
}

async function createRsvp(req, res, next) {
  try {
    const event = await eventRepository.findById(req.params.eventId)

    if (!event) {
      return res.status(404).json({
        message: 'Event not found'
      })
    }

    const confirmed = await rsvpRepository.countConfirmedByEventId(
      event.id
    )

    const confirmedCount = Number(confirmed.count)

    if (confirmedCount >= event.capacity) {
      return res.status(409).json({
        message: 'Event is at capacity'
      })
    }

    const confirmationNumber =
      `INVYTE-${Date.now()}`

    const rsvpData = {
      event_id: event.id,
      user_id: req.user ? req.user.user_id : null,
      name: req.body.name,
      email: req.body.email,
      status: 'confirmed',
      confirmation_number: confirmationNumber,
      meal_preference: req.body.meal_preference
    }

    const [rsvp] = await rsvpRepository.createRsvp(rsvpData)

    await auditRepository.createLog({
      user_id: req.user ? req.user.user_id : null,
      event_id: event.id,
      action: 'RSVP_CREATED',
      details: `RSVP created for ${rsvp.email}`
    })

    res.status(201).json({
      rsvp
    })
  } catch (error) {
    next(error)
  }
}

async function updateRsvp(req, res, next) {
  try {
    const existingRsvp = await rsvpRepository.findById(req.params.id)

    if (!existingRsvp) {
      return res.status(404).json({
        message: 'RSVP not found'
      })
    }

    const changes = {
      name: req.body.name,
      email: req.body.email,
      status: req.body.status,
      meal_preference: req.body.meal_preference
    }

    const [rsvp] = await rsvpRepository.updateRsvp(
      req.params.id,
      changes
    )

    await auditRepository.createLog({
      user_id: req.user.user_id,
      event_id: rsvp.event_id,
      action: 'RSVP_UPDATED',
      details: `RSVP updated for ${rsvp.email}`
    })

    res.status(200).json({
      rsvp
    })
  } catch (error) {
    next(error)
  }
}

async function cancelRsvp(req, res, next) {
  try {
    const existingRsvp = await rsvpRepository.findById(req.params.id)

    if (!existingRsvp) {
      return res.status(404).json({
        message: 'RSVP not found'
      })
    }

    const [rsvp] = await rsvpRepository.updateRsvp(
      req.params.id,
      {
        status: 'cancelled'
      }
    )

    await auditRepository.createLog({
      user_id: req.user ? req.user.user_id : null,
      event_id: rsvp.event_id,
      action: 'RSVP_CANCELLED',
      details: `RSVP cancelled for ${rsvp.email}`
    })

    res.status(200).json({
      rsvp
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getRsvpsByEvent,
  getRsvpByConfirmation,
  createRsvp,
  updateRsvp,
  cancelRsvp
}