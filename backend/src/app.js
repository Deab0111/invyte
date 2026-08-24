const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/authRoutes')
const errorHandler = require('./middleware/errorHandler')
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok'
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

app.use(errorHandler)

module.exports = app