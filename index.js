const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const cors = require('cors')
const flush = require('connect-flash')
const middleware = require('./app/config/middleware')
require('dotenv').config()

const app = express()

const connectDB = require('./app/config/database')

const topicRouters = require('./app/routers/topic')
const categoryRouters = require('./app/routers/category')
const albumRouters = require('./app/routers/album')
const trendingRouters = require('./app/routers/trending')
const playListRouters = require('./app/routers/playlist')
const songRouters = require('./app/routers/song')

const generateRouters = require('./app/routers')
const { initDb } = require('./app/config')

app.set('views', path.join(__dirname, 'build/views'))
app.set('view engine', 'ejs')

app.use(express.json(), cors())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/img', express.static(path.join(__dirname, 'build/images')))
app.use('/js', express.static(path.join(__dirname, 'build/javascripts')))
app.use('/css', express.static(path.join(__dirname, 'build/stylesheets')))
app.use('/assets', express.static(path.join(__dirname, 'build/assets')))

app.use(
  session({
    secret: process.env.JWT_SECRET,
    cookie: {
      maxAge: 60000,
    },
    resave: false,
    saveUninitialized: false,
  })
)
app.use(flush())
app.use(middleware.tokenExtractor)

app.get('/', (req, res) => {
  res.send('API music by ducph')
})

app.get('/auth', (req, res) => {
  return res.redirect('/auth/bai-hat')
})

// Call connect database
connectDB()
initDb()

app.use('/api', topicRouters)
app.use('/api', categoryRouters)
app.use('/api', albumRouters)
app.use('/api', trendingRouters)
app.use('/api', playListRouters)
app.use('/api', songRouters)

generateRouters(app)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

process.on('uncaughtException', (err) => {
  console.log('Has uncaught exception', err)
  process.exit(1)
})

const port = process.env.PORT || 9000
const host = process.env.HOST || 'localhost'
app.listen(port, () => {
  console.log(`Listening: http://${host}:${port}`)
})
