const { User } = require('../../db');

const deleteUser = async (id) => {

    const userToDelete = await User.findByPk(id);

    if (!userToDelete) {
        throw Error(`No user has been found matching the id: ${id}`)

    } else {
        userToDelete.deleted = true;
        await userToDelete.save()
    }
}

module.exports = deleteUser;