const { Review } = require('../../db');

const deleteReview = async (id) => {

    const reviewToDelete = await Review.findByPk(id);

    if (!reviewToDelete) {
        throw Error(`No review has been found matching the id: ${id}`)

    } else {
        reviewToDelete.deleted = true;
        await reviewToDelete.save()
    }
}

module.exports = deleteReview;