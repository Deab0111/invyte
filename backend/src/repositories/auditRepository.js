const db = require('../db')

function findAll() {
  return db('audit_logs')
    .select('*')
    .orderBy('created_at', 'desc')
}

function findById(id) {
  return db('audit_logs')
    .where({ id })
    .first()
}

function findByUserId(userId) {
  return db('audit_logs')
    .where({ user_id: userId })
    .orderBy('created_at', 'desc')
}

function findByEventId(eventId) {
  return db('audit_logs')
    .where({ event_id: eventId })
    .orderBy('created_at', 'desc')
}

function createLog(logData) {
  return db('audit_logs')
    .insert(logData)
    .returning('*')
}

module.exports = {
  findAll,
  findById,
  findByUserId,
  findByEventId,
  createLog
}