const createReview = require('../../controllers/reviews/createReview')

const createReviewHandler = async (req, res) => {

    const { title, qualification, comment, id_user, id_book } = req.body;

    try {
        if (!title || !qualification || !comment) {
            res.status(400).send('Please check that you have completed all the required fields')
        } else {
            const newReview = await createReview(title, qualification, comment, id_user, id_book)
            res.status(200).send('Congratulations! Your review has been created!')
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = createReviewHandler;