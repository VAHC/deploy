const { Router } = require('express')
const {
    getAuthorsHandler,
    postAuthorHandler,
  } = require('../handlers/authors/authorHandler')

const authorRouter = Router();

authorRouter.get('/', getAuthorsHandler)
authorRouter.post('/', postAuthorHandler)

module.exports = authorRouter