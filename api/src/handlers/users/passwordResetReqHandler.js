const passwordResetReq = require('../../controllers/users/passwordResetReq');

const passwordResetReqHandler = async (req, res) => {

    const { email } = req.body

    try {
        const user = await passwordResetReq(email)
        res.status(200).json({message: `The email to restore the password has ben sent to ${email}`})

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = passwordResetReqHandler
