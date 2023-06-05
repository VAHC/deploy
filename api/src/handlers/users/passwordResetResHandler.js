const passwordResetRes = require('../../controllers/users/passwordResetRes');

const passwordResetResHandler = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    console.log(token)

    try {
        const restore = await passwordResetRes(token, password)
        res.status(200).json({message: `The password has been restored`})

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

module.exports = passwordResetResHandler;