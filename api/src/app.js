const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cors = require('cors');
const {URL_Vercel} = require('../rutas.js')

const server = express();

// Configuración básica de CORS
const corsOptions = {
  // origin: 'http://127.0.0.1:5173',
  origin: URL_Vercel,
  credentials: true,
};
server.use(express.static('uploads')) // Carpeta visible, es la raíz

server.use(cors(corsOptions));
server.name = 'API';
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
//server.set('view engine', 'ejs'); // Eliminar cuando esté el front

const sessionConfig = {
  name: 'session',
  secret: 'secreto',
  maxAge: 24 * 60 * 60 * 1000, // Duración de la sesión en milisegundos (aquí, 24 horas)
};

server.use(cookieSession(sessionConfig));

server.use(passport.initialize());
server.use(passport.session()); // Aquí se crea la cookie de sesión

server.use(morgan('dev'));
server.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'https://rayuela-book-club.vercel.app') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Origin', 'https://deploy-six-amber.vercel.app/')
  // res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
