const { Review } = require('../../db');

const editReview = async (id, title, qualification, comment) => {

    const reviewToUpdate = await Review.findByPk(id);

    if (!reviewToUpdate) {
        throw Error(`No review has been found matching the id: ${id}`)

    } else {
        reviewToUpdate.title = title
        reviewToUpdate.qualification = qualification
        reviewToUpdate.comment = comment

        await reviewToUpdate.save()
    }
}

module.exports = editReview;