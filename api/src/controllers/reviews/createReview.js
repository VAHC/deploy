const { Book, Review, User } = require('../../db');

const createReview = async (title, qualification, comment, id_user, id_book) => {

    
    const user = await User.findByPk(id_user);
    if (!user) {
        throw Error(`No user has been found matching the id: ${id_user}`);
    }
    
    const book = await Book.findByPk(id_book);
    if (!book) {
        throw Error(`No book has been found matching the id: ${id_book}`);
    }
    
    const newReview = await Review.create({
        title,
        qualification,
        comment
    });
    
    await newReview.setUser(user);
    await newReview.setBook(book);

    return newReview;
}

module.exports = createReview;