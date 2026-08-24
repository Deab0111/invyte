const db = require('../db')

function findAll() {
  return db('events')
    .select('*')
}

function findById(id) {
  return db('events')
    .where({ id })
    .first()
}

function findByHostId(hostId) {
  return db('events')
    .where({ host_id: hostId })
    .select('*')
}

function findByShareCode(shareCode) {
  return db('events')
    .where({ share_code: shareCode })
    .first()
}

function createEvent(eventData) {
  return db('events')
    .insert(eventData)
    .returning('*')
}

function updateEvent(id, changes) {
  return db('events')
    .where({ id })
    .update(changes)
    .returning('*')
}

function deleteEvent(id) {
  return db('events')
    .where({ id })
    .del()
}

module.exports = {
  findAll,
  findById,
  findByHostId,
  findByShareCode,
  createEvent,
  updateEvent,
  deleteEvent
}