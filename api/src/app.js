const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes/index.js')

const passport = require('passport')
const session = require('express-session')
const cors = require("cors");
require('./db.js')

const server = express()

server.name = 'API'

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
server.use(cookieParser('miClaveSecreta', { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) }));

server.set('view engine', 'ejs') // eliminar cuando este el front
server.use(session({ secret: 'miClaveSecreta', resave: true, saveUninitialized: true }));

server.use(passport.initialize())
server.use(passport.session())

server.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);


server.use(bodyParser.json({ limit: '50mb' }))
server.use(morgan('dev'))
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://deploy-six-amber.vercel.app') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

server.use('/', routes)

server.get('/login', (req, res) => {
  res.render('login')
  /// eliminar cuando este funcionando el front
  // elimnar carpeta views de API
})
server.get('/registro', (req, res) => {
  res.render('registro')
  /// eliminar cuando este funcionando el front
  // elimnar carpeta views de API
})


// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500
  const message = err.message || err
  console.error(err)
  res.status(status).send(message)
})

module.exports = server
