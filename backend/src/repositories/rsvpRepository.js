const db = require('../db')

function findAll() {
  return db('rsvps')
    .select('*')
}

function findById(id) {
  return db('rsvps')
    .where({ id })
    .first()
}

function findByEventId(eventId) {
  return db('rsvps')
    .where({ event_id: eventId })
    .select('*')
}

function findByUserId(userId) {
  return db('rsvps')
    .where({ user_id: userId })
    .select('*')
}

function findByConfirmationNumber(confirmationNumber) {
  return db('rsvps')
    .where({ confirmation_number: confirmationNumber })
    .first()
}

function createRsvp(rsvpData) {
  return db('rsvps')
    .insert(rsvpData)
    .returning('*')
}

function updateRsvp(id, changes) {
  return db('rsvps')
    .where({ id })
    .update(changes)
    .returning('*')
}

function deleteRsvp(id) {
  return db('rsvps')
    .where({ id })
    .del()
}

function countConfirmedByEventId(eventId) {
  return db('rsvps')
    .where({
      event_id: eventId,
      status: 'confirmed'
    })
    .count('id as count')
    .first()
}

module.exports = {
  findAll,
  findById,
  findByEventId,
  findByUserId,
  findByConfirmationNumber,
  createRsvp,
  updateRsvp,
  deleteRsvp,
  countConfirmedByEventId
}