const deleteReview = require('../../controllers/reviews/deleteReview')

const deleteReviewHandler = async (req, res) => {
    const { id } = req.params

    try {
            const deletedReview = await deleteReview(id)
            res.status(200).send('The review has been deleted')
        }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = deleteReviewHandler;