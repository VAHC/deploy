const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const TestingMail = async (req, res) => {

  /** testing account */
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  let message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Successfully Register with us.", // plain text body
    html: "<b>Successfully Register with us.</b>", // html body
  }


  transporter.sendMail(message).then((info) => {
    return res.status(201)
      .json({
        msg: "you should receive an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info)
      })
  }).catch(error => {
    return res.status(500).json({ error })
  })

  // res.status(201).json("Signup Successfully...!");
}

// [
//     {
//         item : "Nodemailer Stack Book",
//         description: "A Backend application",
//         price : "$10.99",
//     }
// ]

const Mailgmail = async (Cabezara, Url, Titulo, Intro, ARRProductos, outro, To, subject) => {
  return new Promise((resolve, reject) => {
    let config = {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: Cabezara,
        link: Url
      }
    })

    let response = {
      body: {
        name: Titulo,
        intro: Intro,
        greeting: 'Estimado',
        signature: 'Atentamente',
        table: {
          data: ARRProductos
        },
        outro: outro
      }
    }

    let mail = MailGenerator.generate(response)

    let message = {
      from: process.env.EMAIL,
      to: To,
      subject: subject,
      html: mail
    }

    transporter.sendMail(message)
      .then(() => {
        resolve({
          msg: "Deberías recibir un correo electrónico."
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};

const MailgmailPassword = async (Cabezara, Url, Titulo, Intro, To, subject) => {
  return new Promise((resolve, reject) => {
    let config = {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: Cabezara,
        link: Url
      }
    })

    let response = {
      body: {
        name: Titulo,
        intro: 'Te enviamos este correo porque has solicitado restablecer tu contraseña',
        greeting: 'Estimado',
        signature: 'Atentamente',
        action: {
          instructions: 'Haz click en el siguiente botón para continuar',
          button: {
            color: '#DC4D2F',
            text: 'Restaurar contraseña',
            link: Url
          }
        },
        outro: 'Si no solicitaste restablecer tu contraseña, no debes realizar ninguna acción más'
      }
    }
  
      let mail = MailGenerator.generate(response)
  
      let message = {
        from: process.env.EMAIL,
        to: To,
        subject: subject,
        html: mail
      }
  
      transporter.sendMail(message)
        .then(() => {
          resolve({
            msg: "Deberías recibir un correo electrónico."
          });
        })
        .catch(error => {
          reject(error);
        });
    });
};


const MailgmailPasswordDone = async (Cabezara, Url, Titulo, Intro, To, subject) => {
  return new Promise((resolve, reject) => {
    let config = {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: Cabezara,
        link: Url
      }
    })

    let response = {
      body: {
        name: Titulo,
        intro: 'Tu contraseña ha sido restablecida exitosamente',
        greeting: 'Estimado',
        signature: 'Atentamente',
        action: {
          instructions: 'Haz click para loguearte con tu nueva contraseña',
          button: {
            color: '#DC4D2F',
            text: 'Ingresar a Rayuela',
            link: Url
          }
        },
        outro: 'Recuerda que tu contraseña es privada y no debes compartirla con nadie'
      }
    }
  
      let mail = MailGenerator.generate(response)
  
      let message = {
        from: process.env.EMAIL,
        to: To,
        subject: subject,
        html: mail
      }
  
      transporter.sendMail(message)
        .then(() => {
          resolve({
            msg: "Deberías recibir un correo electrónico."
          });
        })
        .catch(error => {
          reject(error);
        });
    });
};



const RealMail = (req, res) => {

  const { userEmail } = req.body;

  let config = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  }

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: 'https://mailgen.js/'
    }
  })

  let response = {
    body: {
      name: "Daily Tuition",
      intro: "Your bill has arrived!",
      greeting: 'Estimado',
      signature: 'Atentamente',
      table: {
        data: [
          {
            item: "Nodemailer Stack Book",
            description: "A Backend application",
            price: "$10.99",
          }
        ]
      },
      outro: "Looking forward to do more business"
    }
  }

  let mail = MailGenerator.generate(response)

  let message = {
    from: process.env.EMAIL,
    to: 'juanlorenzomdp@gmail.com',
    subject: "Place Order",
    html: mail
  }

  transporter.sendMail(message).then(() => {
    return res.status(201).json({
      msg: "you should receive an email"
    })
  }).catch(error => {
    return res.status(500).json({ error })
  })
}


module.exports = { TestingMail, RealMail, Mailgmail, MailgmailPassword, MailgmailPasswordDone };
