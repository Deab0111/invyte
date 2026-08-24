const db = require('../db')

function findAll() {
  return db('users')
    .select(
      'id',
      'first_name',
      'last_name',
      'email',
      'role',
      'rank',
      'phone',
      'created_at',
      'updated_at'
    )
}

function findById(id) {
  return db('users')
    .where({ id })
    .first()
}

function findByEmail(email) {
  return db('users')
    .where({ email })
    .first()
}

function createUser(userData) {
  return db('users')
    .insert(userData)
    .returning([
      'id',
      'first_name',
      'last_name',
      'email',
      'role',
      'rank',
      'phone',
      'created_at',
      'updated_at'
    ])
}

function updateUser(id, changes) {
  return db('users')
    .where({ id })
    .update(changes)
    .returning([
      'id',
      'first_name',
      'last_name',
      'email',
      'role',
      'rank',
      'phone',
      'created_at',
      'updated_at'
    ])
}

function deleteUser(id) {
  return db('users')
    .where({ id })
    .del()
}

module.exports = {
  findAll,
  findById,
  findByEmail,
  createUser,
  updateUser,
  deleteUser
}