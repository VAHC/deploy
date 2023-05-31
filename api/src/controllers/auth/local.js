const passport = require('passport')
const PassPortLocal = require('passport-local').Strategy
const { User } = require('../../db');


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

passport.use(new PassPortLocal({ passReqToCallback: true,  usernameField: 'email' }, async function (req, email, password, done) {
      // entra por aca la info
      console.log('local js');
      const {firstName} = req.body
      console.log('########');
      console.log(req.body);
      /////////
      const cookieOptions = {
        maxAge: 365 * 24 * 60 * 60 * 1000, // 1 año de duración en milisegundos
        httpOnly: true // Opcional: para que la cookie solo sea accesible en el servidor
      };
      req.session.cookie = cookieOptions;
      ///////
        if (firstName){
          console.log('entre');
          CreateUser(req,email,password,done)
        }else
        {
          FindUser(email,password,done)
        }
}))
