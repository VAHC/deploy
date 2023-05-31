const { Review, User, Book } = require('../../db');

const getAllReviews = async () => {

    const reviews = await Review.findAll(
        {
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName'],
                },
                {
                    model: Book,
                    attributes: ['title'],
                }
            ]
        })

    const mappedReviews = reviews.map(r => {
        
        return {
          id: r.id,
          bookTitle: r.book.title,
          title: r.title,
          qualification: r.qualification,
          comment: r.comment,
          id_user: r.id_user,
          userFirstName: r.user.firstName,
          userLastName: r.user.lastName,
          id_book: r.id_book,
         
        }
      })


    return mappedReviews;
}

module.exports = getAllReviews