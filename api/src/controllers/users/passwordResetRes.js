const { User } = require('../../db');
const jwt = require('jsonwebtoken');
const { MailgmailPasswordDone } = require('../../handlers/mailing/mailing');
require('dotenv').config();
const {URL_Vercel} = require('../../../rutas')


const passwordResetRes = async (token, password) => {

    const secretKey = process.env.JWT_SECRET_KEY;

    const decodedToken = jwt.verify(token, secretKey)
    const userId = decodedToken.userId

    const userToReset = await User.findByPk(userId)

    console.log(userToReset)

    if (!userToReset) {
        throw Error(`Invalid or expired token`)
    } else {

        userToReset.password = password;

        await userToReset.save()

        await MailgmailPasswordDone("Rayuela",`${URL_Vercel}/ingresar`,`${userToReset.firstName}`, 'Intro',`${userToReset.email}`, 'Cambio de contraseña')
    }
}
    module.exports = passwordResetRes;