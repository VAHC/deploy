const deleteUser = require('../../controllers/users/deleteUser')

const deleteUserHandler = async (req, res) => {
    const { id } = req.params

    try {
            const deletedUser = await deleteUser(id)
            res.status(200).send('The user has been deleted')
        }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = deleteUserHandler;