const { User } = require('../../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MailgmailPassword } = require('../../handlers/mailing/mailing')
const {URL_Vercel} = require('../../../rutas')


const passwordResetReq = async (email) => {

    const userToReset = await User.findOne({ where: { email } })
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!userToReset) {
        throw Error(`No user has been found matching the email: ${email}`)
    
    } if(userToReset.createdDb === true) {

        const token = jwt.sign({ userId: userToReset.id}, secretKey)
        console.log(token)

        const mail = await MailgmailPassword("Reestablece tu constraseña", `${URL_Vercel}/restablecer-contraseña?token=${token}`,'Titulo', 'Intro', email, 'subject')
        
       console.log(mail);
    }
}


    module.exports = passwordResetReq;