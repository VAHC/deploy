const { Review, User, Book } = require('../../db');

const getUserById = async (id) => {

    const user = await User.findByPk(id,
        {
            include: {
                model: Review,
                attributes: ['id', 'title', 'qualification', 'comment', 'deleted', 'id_book'],
                include: {
                    model: Book,
                    attributes: ['title'],
                }
            }
        })

    const userMapped = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            phone: user.phone,
            profile: user.profile,
            createdDb: user.createdDb,
            deleted: user.deleted,
            reviews: user.reviews.map(r => {
                return {
                    id: r.id,
                    title: r.title,
                    qualification: r.qualification,
                    comment: r.comment,
                    deleted: r.deleted,
                    id_book: r.id_book,
                    book: r.book.title
                }
            
            })
        }


    return userMapped;
}

module.exports = getUserById