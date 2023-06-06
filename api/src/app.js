const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const {URL_Vercel} = require('../rutas.js')

const server = express();

// Configuración básica de CORS
const corsOptions = {
  origin: URL_Vercel,
  credentials: true,
};

server.use(cors(corsOptions));
server.name = 'API';
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
//server.set('view engine', 'ejs'); // Eliminar cuando esté el front

// Configuración de express-session
server.use(
  session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
  })
);

server.use(passport.initialize());
server.use(passport.session()); // aca es donde se deberia crear la cookie

// En caso de ser usado localmente el proyecto, se debe descomentar la linea 44 y comentar la linea 43
// 'Access-Control-Allow-Origin'

server.use(morgan('dev'));
server.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'https://rayuela-book-club.vercel.app') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Origin', URL_Vercel)
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

server.use('/', routes)

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500
  const message = err.message || err
  console.error(err)
  res.status(status).send(message)
})

module.exports = server
