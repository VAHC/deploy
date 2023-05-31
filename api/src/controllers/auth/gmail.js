const passport = require('passport')
 require('dotenv').config()
 const { User } = require('../../db');

// const GoogleStrategy = require('passport-google-oauth2').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const findOrCreate= async (firstName,lastName,username,password,phone,done)=>{

  try {
    if(firstName && lastName && username && password ){
      const [user, created] = await User.findOrCreate({ where: { email: username },
        defaults: { password: password,
                     profile: 'usuario',
                     firstName: firstName,
                     lastName: lastName,
                     phone: phone,
                     createdDb: false
       }});
      // console.log(created);
       if (created) {
        // El usuario se creó correctamente
              return done(null, user);
        } else {
        // Las credenciales son válidas, autenticación exitosa
          if(user.dataValues.createdDb)
          {
            // se creo usando el metodo local
              return done(null, false);
          }else
          {
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
        callbackURL: 'http://localhost:3001/books/auth/authSocial/google',
      },
      async (accessToken, refreshToken, profile, done) => {
        // Aquí puedes realizar acciones adicionales, como buscar o crear un usuario en tu base de datos
        // Luego, llama a `done` para pasar el perfil del usuario a Passport
      //  console.log(profile);
           /////////
           const cookieOptions = {
            maxAge: 365 * 24 * 60 * 60 * 1000, // 1 año de duración en milisegundos
            httpOnly: true // Opcional: para que la cookie solo sea accesible en el servidor
          };
      
          req.session.cookie = cookieOptions;
          ///////
         findOrCreate(profile.name.givenName,profile.name.familyName,
          profile.emails[0].value,'aeae4se50s',
          0,done
        )
      }
    )
  );

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: 'http://localhost:3001/books/auth/authSocial/google',
//   passReqToCallback: true
// },
// async function  (request, accessToken, refreshToken, profile, done)  {
//   // aca busco en la base de datos o lo creo
//   // entra por aca la info
//   findOrCreate(profile.name.givenName,profile.email,'hsdhsye4y4aeae4se50s7s',done)
//  // return done(null, profile)
// }))
