const editReview = require('../../controllers/reviews/editReview')

const editReviewHandler = async (req, res) => {

    const { id } = req.params
    const { title, qualification, comment } = req.body;

    try {
        if (!title || !qualification || !comment) {
            res.status(400).send('Please check that you have completed all the required fields')

        } else {
            const editedReview = await editReview(id, title, qualification, comment)
            res.status(200).send('Congratulations! Your review has been updated!')
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = editReviewHandler;