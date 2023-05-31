const { Book, Gender, Author, Review, User } = require('../../db.js');

const getAllBooks = async () => {
    const databaseBooks = await Book.findAll({
        include:
            [{
                model: Gender,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            },
            {
                model: Author,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            },
            {
                model: Review,
                attributes: ['id', 'title', 'qualification', 'comment', 'id_user'],
                include: [
                    {
                        model: User,
                        attributes: ['firstName', 'lastName'],
                    }
                ]
            }
            ]
    })

    const sortedBooks = databaseBooks.sort((a, b) => a.title.localeCompare(b.title))

    const dbBooks = sortedBooks.map(b => {
        return {
            id: b.id,
            title: b.title,
            publisher: b.publisher,
            description: b.description,
            price: b.price,
            stock: b.stock,
            publishedDate: b.publishedDate,
            image: b.image,
            createdDb: b.createdDb,
            authors: b.authors.map(el => el.name),
            genders: b.genders.map(el => el.name),
            reviews: b.reviews.map(r => {
                return {
                    id: r.id,
                    title: r.title,
                    qualification: r.qualification,
                    comment: r.comment,
                    id_user: r.id_user,
                    userFirstName: r.user.firstName,
                    userLastName: r.user.lastName
                }
            })
        }
    })

    return dbBooks;
};

module.exports = getAllBooks;