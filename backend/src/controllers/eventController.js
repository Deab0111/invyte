const eventRepository = require('../repositories/eventRepository')
const auditRepository = require('../repositories/auditRepository')

async function getAllEvents(req, res, next) {
  try {
    const events = await eventRepository.findAll()

    res.status(200).json({
      events
    })
  } catch (error) {
    next(error)
  }
}

async function getEventById(req, res, next) {
  try {
    const event = await eventRepository.findById(req.params.id)

    if (!event) {
      return res.status(404).json({
        message: 'Event not found'
      })
    }

    res.status(200).json({
      event
    })
  } catch (error) {
    next(error)
  }
}

async function getMyEvents(req, res, next) {
  try {
    const events = await eventRepository.findByHostId(
      req.user.user_id
    )

    res.status(200).json({
      events
    })
  } catch (error) {
    next(error)
  }
}

async function createEvent(req, res, next) {
  try {
    const eventData = {
      host_id: req.user.user_id,
      name: req.body.name,
      description: req.body.description,
      event_date: req.body.event_date,
      start_time: req.body.start_time,
      location: req.body.location,
      capacity: req.body.capacity,
      share_code: req.body.share_code
    }

    const [event] = await eventRepository.createEvent(eventData)

    await auditRepository.createLog({
      user_id: req.user.user_id,
      event_id: event.id,
      action: 'EVENT_CREATED',
      details: `Created event ${event.name}`
    })

    res.status(201).json({
      event
    })
  } catch (error) {
    next(error)
  }
}

async function updateEvent(req, res, next) {
  try {
    const event = await eventRepository.findById(req.params.id)

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
        message: 'You do not have permission to update this event'
      })
    }

    const changes = {
      name: req.body.name,
      description: req.body.description,
      event_date: req.body.event_date,
      start_time: req.body.start_time,
      location: req.body.location,
      capacity: req.body.capacity,
      share_code: req.body.share_code
    }

    const [updatedEvent] = await eventRepository.updateEvent(
      req.params.id,
      changes
    )

    await auditRepository.createLog({
      user_id: req.user.user_id,
      event_id: updatedEvent.id,
      action: 'EVENT_UPDATED',
      details: `Updated event ${updatedEvent.name}`
    })

    res.status(200).json({
      event: updatedEvent
    })
  } catch (error) {
    next(error)
  }
}

async function deleteEvent(req, res, next) {
  try {
    const event = await eventRepository.findById(req.params.id)

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
        message: 'You do not have permission to delete this event'
      })
    }

    await auditRepository.createLog({
      user_id: req.user.user_id,
      event_id: event.id,
      action: 'EVENT_DELETED',
      details: `Deleted event ${event.name}`
    })

    await eventRepository.deleteEvent(req.params.id)

    res.status(200).json({
      message: 'Event deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllEvents,
  getEventById,
  getMyEvents,
  createEvent,
  updateEvent,
  deleteEvent
}