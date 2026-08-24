const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRepository = require('../repositories/userRepository')

async function register(req, res, next) {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      rank,
      phone
    } = req.body

    const existingUser = await userRepository.findByEmail(email)

    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists'
      })
    }

    const password_hash = await bcrypt.hash(password, 10)

    const [user] = await userRepository.createUser({
      first_name,
      last_name,
      email,
      password_hash,
      role: role || 'user',
      rank,
      phone
    })

    res.status(201).json({
      user
    })
  } catch (error) {
    next(error)
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body

    const user = await userRepository.findByEmail(email)

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    )

    if (!passwordMatches) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    const token = jwt.sign(
      {
        user_id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h'
      }
    )

    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax'
      })
      .status(200)
      .json({
        message: 'Login successful',
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
          rank: user.rank,
          phone: user.phone
        }
      })
  } catch (error) {
    next(error)
  }
}

function logout(req, res) {
  res
    .clearCookie('token')
    .status(200)
    .json({
      message: 'Logout successful'
    })
}

module.exports = {
  register,
  login,
  logout
}