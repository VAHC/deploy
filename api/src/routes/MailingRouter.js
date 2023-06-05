const { Router } = require('express')
const {
  TestingMail,RealMail,Mailgmail
  } = require('../handlers/mailing/mailing')


const MailingRouter = Router();

MailingRouter.get('/', TestingMail)
MailingRouter.get('/google', RealMail)
MailingRouter.get('/hola', async (req, res) => {
  try {
    ARRProductos = [{
      item: "Nodemailer Stack Book",
      description: "A Backend application",
      price: "$10.99",
    }];
    const result = await Mailgmail('fgsgsggf', 'https://rayuela-book-club.vercel.app/', 'Ttuidslo', 'Intro 3', ARRProductos, '424ro', 'juanlorenzomdp@gmail.com', 'pf');
    // Hacer algo con el resultado
    res.send(result); // Ejemplo: enviar el resultado como respuesta al cliente
  } catch (error) {
    // Manejar el error si ocurre
    res.status(500).send('Error en la llamada a Mailgmail');
  }
});

module.exports = MailingRouter;