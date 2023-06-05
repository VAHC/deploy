const { User } = require('../../db');
const jwt = require('jsonwebtoken');
const { MailgmailPasswordDone } = require('../../handlers/mailing/mailing');
require('dotenv').config();



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

        await MailgmailPasswordDone("Rayuela",`http://127.0.0.1:5173/ingresar`,`${userToReset.firstName}`, 'Intro',`${userToReset.email}`, 'Cambio de contraseña')
    }
}
    module.exports = passwordResetRes;