const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const flush = require('connect-flash')
const { SECRET } = require('./constants')
const { initDb } = require('./app/config')
const middleware = require('./app/config/middleware')

const app = express()

const connectDB = require('./app/config/database')

const topicRouters = require('./app/routers/topic')
const categoryRouters = require('./app/routers/category')
const albumRouters = require('./app/routers/album')
const trendingRouters = require('./app/routers/trending')
const playListRouters = require('./app/routers/playlist')
const songRouters = require('./app/routers/song')

const generateRouters = require('./app/routers')

app.set('views', path.join(__dirname, 'build/views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/img', express.static(path.join(__dirname, 'build/images')))
app.use('/js', express.static(path.join(__dirname, 'build/javascripts')))
app.use('/css', express.static(path.join(__dirname, 'build/stylesheets')))
app.use('/assets', express.static(path.join(__dirname, 'build/assets')))

app.use(
  session({
    secret: SECRET,
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

app.use('/api', topicRouters)
app.use('/api', categoryRouters)
app.use('/api', albumRouters)
app.use('/api', trendingRouters)
app.use('/api', playListRouters)
app.use('/api', songRouters)

generateRouters(app)
initDb()

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = process.env.PORT || 9000
const HOST = process.env.HOST || 'localhost'
app.listen(PORT, () => {
  console.log(`Listening: http://${HOST}:${PORT}`)
})
