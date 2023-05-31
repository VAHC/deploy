const { Router } = require('express');
const getAllReviewsHandler = require('../handlers/reviews/getAllReviewsHandler');
const createReviewHandler = require('../handlers/reviews/createReviewHandler');
const editReviewHandler = require('../handlers/reviews/editReviewHandler');
const deleteReviewHandler = require('../handlers/reviews/deleteReviewHandler');

const reviewsRouter = Router();

reviewsRouter.get('/', getAllReviewsHandler)
reviewsRouter.post('/', createReviewHandler)
reviewsRouter.put('/:id', editReviewHandler)
reviewsRouter.put('/delete/:id', deleteReviewHandler)


module.exports = reviewsRouter