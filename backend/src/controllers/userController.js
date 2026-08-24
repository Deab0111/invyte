const userRepository = require('../repositories/userRepository')

async function getAllUsers(req, res, next) {
  try {
    const users = await userRepository.findAll()

    res.status(200).json({
      users
    })
  } catch (error) {
    next(error)
  }
}

async function getUserById(req, res, next) {
  try {
    const user = await userRepository.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    const {
      password_hash,
      ...safeUser
    } = user

    res.status(200).json({
      user: safeUser
    })
  } catch (error) {
    next(error)
  }
}

async function updateUser(req, res, next) {
  try {
    const userId = req.params.id

    const changes = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      rank: req.body.rank,
      phone: req.body.phone
    }

    const [user] = await userRepository.updateUser(
      userId,
      changes
    )

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    res.status(200).json({
      user
    })
  } catch (error) {
    next(error)
  }
}

async function deleteUser(req, res, next) {
  try {
    const deleted = await userRepository.deleteUser(
      req.params.id
    )

    if (!deleted) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    res.status(200).json({
      message: 'User deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}