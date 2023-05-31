const { Router } = require('express')
const bookRouter = require('./bookRouter')
const bookRouterAuth = require('./bookRouterAuth')
const genderRouter = require('./genderRouter')
const authorRouter = require('./authorRouter')
const reviewsRouter = require('./reviewsRouter')
const usersRouter = require('./userRouter')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/books', bookRouter)
router.use('/books/auth', bookRouterAuth)
router.use('/genres', genderRouter)
router.use('/authors', authorRouter)
router.use('/reviews', reviewsRouter)
router.use('/users', usersRouter)


module.exports = router
