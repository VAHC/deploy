const { Router } = require('express')
const {
    getGendersHandler,
    postGenderHandler,
  } = require('../handlers/genders/genderHandler')

const genderRouter = Router();

genderRouter.get('/', getGendersHandler)
genderRouter.post('/', postGenderHandler)

module.exports = genderRouter;