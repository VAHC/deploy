const { User } = require('../../db');

const updateUser = async (id, firstName, lastName, email, phone, profile) => {

    const userToUpdate = await User.findByPk(id);

    if (!userToUpdate) {
        throw Error(`No user has been found matching the id: ${id}`)

    } else {
        userToUpdate.firstName = firstName
        userToUpdate.lastName = lastName
        userToUpdate.email = email
        userToUpdate.phone = phone
        userToUpdate.profile = profile

        await userToUpdate.save()
    }
}

module.exports = updateUser;