const { Router } = require('express')

const {ValidateUser,LogOut} = require ('../handlers/auth/loginHandler')
const bookRouterAuth = Router()

require('../controllers/auth/gmail.js')
require('../controllers/auth/local.js')
const passport = require('passport')
const CLIENT_URL = "http://127.0.0.1:5173";

function isLoggedIn (req, res, next) {
    req.isAuthenticated() ? next() :  res.status(401).json({ message: 'Credenciales inválidas validate' })
     //res.sendStatus(401)
  }
  
  // serializacion
  // { id: 1, name: 'urial' }
  // 1 => Sereliazcion
  passport.serializeUser(function (user, done) {
    console.log('serializeUser');
    let dato=''

  //  console.log(user);
      
    if (user.provider) {
      dato={
        name:user.name.givenName,
        pepe:'dsds'
      }
    } else {
      dato={
        name:user.name,
        pepe:'dsds'
      } 
    }
    done(null, dato)
  })
  
  // deseralizacion
  passport.deserializeUser(function (user, done) {
    console.log('deserializeUser');
    done(null, user)
  })
  
   bookRouterAuth.get('/validate', isLoggedIn, ValidateUser)

  UserJson=(id,firstName,lastName,email,phone,profile)=>
  {
      return({
        id,
        firstName,
        lastName,
        email,
        phone,
        profile
      })
  }

// Authentication routes
bookRouterAuth.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Error en el servidor ERR' })
    }
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas 401' })
    }
    console.log('-****--');
   // console.log(user);
    // user {
    //   dataValues: {
    //     id: 1,
    //     firstName: 'juan',
    //     lastName: 'tibiletti',
    //     email: 'admin@gmail.com',
    //     password: '12345678',
    //     phone: 1111,
    //     profile: 'usuario',
    //     createdDb: true,
    //     deleted: false
    //   },

    console.log('--***-');
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error en el servidor ERR LOGin' })
      }
      let dato= UserJson(
      user.dataValues.id,
      user.dataValues.firstName,
      user.dataValues.lastName,
      user.dataValues.email,
      user.dataValues.phone,
      user.dataValues.profile)
      res.status(200).json(dato)
    })
  })(req, res, next)
})

bookRouterAuth.get("/authSocial/success", (req, res) => {
  //http://localhost:3001/books/auth/authSocial/success
  
    if (req.user) {
     // let dato= UserJson(
        //     req.user.dataValues.id,
        //     req.user.dataValues.firstName,
        //     req.user.dataValues.lastName,
        //     req.user.dataValues.email,
        //     req.user.dataValues.phone,
        //     req.user.dataValues.profile)
        //     res.status(200).json(dato);

      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        //   cookies: req.cookies
      });
    }
  
   res.send('siii')
});



bookRouterAuth.post('/registro', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Error en el servidor ERR' })
    }
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas 401' })
    }
    console.log('-****--');
  //  console.log(user);
    console.log('--***-');
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error en el servidor ERR LOGin' })
      }
      return res.status(200).json({ message: 'Se creo con exito' })
    })
  })(req, res, next)
})

//router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

bookRouterAuth.get(
  "authSocial/google",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);


 bookRouterAuth.get('/authSocial',
    passport.authenticate('google', { scope: ['email', 'profile'] }
    ))
// Ruta para recibir el callback de Google después de la autenticación
// bookRouterAuth.get('/authSocial/google', passport.authenticate('google', 
//     { successRedirect: CLIENT_URL,
//       failureRedirect: '/login' }), (req, res) => {
//   // El usuario se ha autenticado correctamente, puedes redirigir o responder con una respuesta JSON de éxito
//  console.log('gggggggggggggg');
//   console.log(req.user.dataValues.firstName);
//   // user {
//   //   dataValues: {
//   //     id: 3,
//   //     firstName: 'juan lorenzo',
//   //     lastName: 'tibiletti',
//   //     email: 'juanlorenzomdp@gmail.com',
//   //     password: 'aeae4se50s',
//   //     phone: 0,
//   //     profile: 'usuario',
//   //     createdDb: false,
//   //     deleted: false
//   //   },
//   let dato= UserJson(
//     req.user.dataValues.id,
//     req.user.dataValues.firstName,
//     req.user.dataValues.lastName,
//     req.user.dataValues.email,
//     req.user.dataValues.phone,
//     req.user.dataValues.profile)
//     res.status(200).json(dato);
// });


  bookRouterAuth.get('/logout', LogOut)

module.exports = bookRouterAuth