const { Router } = require('express')
const passport = require('passport');
const bookRouterAuth = Router()
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const PassPortLocal = require('passport-local').Strategy
const jwt = require('jsonwebtoken');
const {User} = require('../db')
const AES = require('crypto-js/aes');
const {URL_Vercel, URL_Railway} = require('../../rutas')



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

////////////// funcion de google
const findOrCreate= async (firstName,lastName,username,password,phone,done)=>{

  try {
    if(firstName && lastName && username && password ){
      const [user, created] = await User.findOrCreate({ where: { email: username },
        defaults: { password: password,
                     profile: 'usuario',
                     firstName: firstName,
                     lastName: lastName,
                    //  phone: phone,
                     createdDb: false
       }});
       console.log(created);
       if (created) {
        // El usuario se creó correctamente
              return done(null, user);
        } else {
        // Las credenciales son válidas, autenticación exitosa
          if(user.dataValues.createdDb)
          {
            console.log('se creo usando el metodo local');
            // se creo usando el metodo local
              return done(null, false);
          }else
          {
            console.log('exito');
            return done(null, user);
          }
        }
    }else{
      // no existe alguna variable lo saco
      return done(null, false);
    }
  } catch (err) {
    console.log(err);
    return done(null, false);
  }
}

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://deploy-production-dccf.up.railway.app/auth/google/callback',
        scope: ['email', 'profile'],
      },
      async (accessToken, refreshToken, profile, done) => {
        // Perform additional actions if needed
        console.log(profile.displayName); //juan lorenzo tibiletti
        console.log(profile.name.familyName); // apellido
        console.log(profile.name.givenName); // nombre
        console.log(profile.emails[0].value); // nombre
        findOrCreate(profile.name.givenName,profile.name.familyName,profile.emails[0].value,'qweg7s5w','',done)
       // return done(null, profile);
      }
    )
  );

// Ruta de inicio de sesión con Google

bookRouterAuth.get('/google', passport.authenticate('google', { session: false }));
/// 1ero llega a bookRouterAuth.get('/google
// 2do va new GoogleStrategy( 
  // 3ero respondo ok
  // 4to google te envia  '/google/callback',
  // 5to  res.redirect(`http://127.0.0.1:5173/login/callback?token=${token}`);

  // {
  //   id: '100010358437647345103',
  //   displayName: 'juan lorenzo tibiletti',
  //   name: { familyName: 'tibiletti', givenName: 'juan lorenzo' },     
  //   emails: [ { value: 'juanlorenzomdp@gmail.com', verified: true } ],
  //   photos: [
  //     {
  //       value: 'https://lh3.googleusercontent.com/a/AAcHTtdnxfkvS2tEBd4IkxkAGObV8tJrd6KJahVUamzN=s96-c'
  //     }
  //   ],
  //   provider: 'google',
  //   _raw: '{\n' +
  //     '  "sub": "100010358437647345103",\n' +
  //     '  "name": "juan lorenzo tibiletti",\n' +
  //     '  "given_name": "juan lorenzo",\n' +
  //     '  "family_name": "tibiletti",\n' +
  //     '  "picture": "https://lh3.googleusercontent.com/a/AAcHTtdnxfkvS2tEBd4IkxkAGObV8tJrd6KJahVUamzN\\u003ds96-c",\n' +
  //     '  "email": "juanlorenzomdp@gmail.com",\n' +
  //     '  "email_verified": true,\n' +
  //     '  "locale": "es"\n' +
  //     '}',
  //   _json: {
  //     sub: '100010358437647345103',
  //     name: 'juan lorenzo tibiletti',
  //     given_name: 'juan lorenzo',
  //     family_name: 'tibiletti',
  //     picture: 'https://lh3.googleusercontent.com/a/AAcHTtdnxfkvS2tEBd4IkxkAGObV8tJrd6KJahVUamzN=s96-c',        
  //     email: 'juanlorenzomdp@gmail.com',
  //     email_verified: true,
  //     locale: 'es'
  //   }
  // }
// Ruta de retorno de inicio de sesión con Google

bookRouterAuth.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    //const username = req.user.username;
    const clave = 'mi_clave_secreta';
    console.log( req.user.dataValues);
      let dato= UserJson(
        req.user.dataValues.id,
        req.user.dataValues.firstName,
        req.user.dataValues.lastName,
        req.user.dataValues.email,
        // req.user.dataValues.phone,
        req.user.dataValues.profile)
        info={
          datos:dato,
          info:req.user.id
        }

  // Encriptar el texto
  const objetoEncriptado = AES.encrypt(JSON.stringify(info), clave).toString();

    // Generar un token JWT que contiene el token encriptado
    const token = jwt.sign({ objetoEncriptado }, 'secreto', { expiresIn: '1d' });

    // Redirigir al frontend con el token encriptado en la URL
    // res.redirect(`${URL_Vercel}/ingresar/?token=${encodeURIComponent(token)}`);
    res.redirect('https://deploy-six-amber.vercel.app/ingresar/?token=${encodeURIComponent(token)}');
  }
);

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/// funcion de local
passport.use(new PassPortLocal({ passReqToCallback: true,  usernameField: 'email' }, async function (req, email, password, done) {
  // entra por aca la info
  console.log('local js');
  const {firstName} = req.body
  console.log('########');

    if (firstName){
      console.log('entre PassPortLocal');
      CreateUser(req,email,password,done)
    }else
    {
      FindUser(email,password,done)
    }
}))

      const CreateUser= async (req,username,password,done)=>{

        try {
          const {firstName,lastName} = req.body
          phone=req.body.phone
          if(!phone)
          {
            phone=0
          }
          if(firstName && lastName && username && password  ){
            const [user, created] = await User.findOrCreate({ where: { email: username },
              defaults: { password: password,
                          profile: 'usuario',
                          firstName: firstName,
                          lastName: lastName,
                          phone: phone,

            }});
            console.log('----- valor created');
            console.log(created);
            console.log('-----');
                if (created) {
                // El usuario se creó correctamente
                return done(null, user);
                } else {
                // Las credenciales son válidas, autenticación exitosa
                return done(null, false);
                }
          }else{
            // no existe alguna variable lo saco
            return done(null, false);
          }
        } catch (err) {
          console.log(err);
          return done(null, false);
        }
      }

      const FindUser =async (username,password,done) =>{
      const usuario = await User.findOne({ where: { email: username } });
      if(usuario)
      {
      console.log(usuario.dataValues.password);
      if(password === usuario.dataValues.password)
      {
        return done(null, usuario);
      }else
      {
        return done(null, false);
      }
      }else{
      return done(null, false);
      }  
      }


  bookRouterAuth.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(200).json({ message: 'Error en el servidor ERR' })
      }
      if (!user) {
        return res.status(200).json({ message: 'Credenciales inválidas 401' })
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(200).json({ message: 'Error en el servidor ERR LOGin' })
        }

        let dato= UserJson(
        user.dataValues.id,
        user.dataValues.firstName,
        user.dataValues.lastName,
        user.dataValues.email,
        user.dataValues.phone,
        user.dataValues.profile)
        info={
          datos:dato,
          info:req.user.id
        }

        const token = jwt.sign({ info  }, 'secreto', { expiresIn: '1d' });
        res.status(200).json({ token })
      })
    })(req, res, next)
  })

/// validacion
  bookRouterAuth.get('/pepe', (req, res) => {
    // Accede a los datos del usuario autenticado
    const user = req.user;
     console.log(('fsf'));
    if(user){
    // Aquí puedes realizar operaciones con los datos del usuario (por ejemplo, buscar en la base de datos, obtener información adicional, etc.)
    // Luego, puedes enviar los datos del usuario como respuesta
    res.json(user);
    }else{
      res.json({'erro':'error'})
    }
  })


  const requireJWTAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  console.log(req.headers.authorization);
    if (!token) {
      return res.send('noo');
    }
    try {
      const decoded = jwt.verify(token, 'secreto');
      req.user = decoded;
      next();
    } catch (error) {
      return res.sendStatus(401);
    }
  };

  bookRouterAuth.get('/protected', requireJWTAuth, (req, res) => {
    const user = req.user; // Access the user object from the request
    res.json({  user });
  });

  ///////////////serializacion cosas en comun
    // serializacion
  // { id: 1, name: 'urial' }
  // 1 => Sereliazcion
  passport.serializeUser(function (user, done) {
    console.log('serializeUser');
   // console.log(user);
     done(null, user)
  })
  
  
  passport.deserializeUser(function (user, done) {
    console.log('deserializeUser');
   // console.log(user);
    done(null, user)
  })
  



  //// rutas  extras
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

function logOut(req, res) {
  res.clearCookie('token'); // Ejemplo: borra la cookie llamada 'token'
  res.json({ message: 'Cierre de sesión exitoso' });
}
bookRouterAuth.get('/logout', logOut)

module.exports = bookRouterAuth