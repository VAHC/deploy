const getAllReviews = require('../../controllers/reviews/getAllReviews')


const getAllReviewsHandler = async (req,res) => {
    try {
        const reviews = await getAllReviews()
        res.status(200).json(reviews)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = getAllReviewsHandler