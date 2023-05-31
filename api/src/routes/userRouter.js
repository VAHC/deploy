const { Router } = require('express');
const getAllUsersHandler = require('../handlers/users/getAllUsersHandler');
const getUserByIdHandler = require('../handlers/users/getUserByIdHandler');
const deleteUserHandler = require('../handlers/users/deleteUserHandler');
const updateUserHandler = require('../handlers/users/updateUserHandler');

const usersRouter = Router();

usersRouter.get('/', getAllUsersHandler)
usersRouter.get('/:id', getUserByIdHandler)
usersRouter.put('/delete/:id', deleteUserHandler)
usersRouter.put('/', updateUserHandler)

module.exports = usersRouter