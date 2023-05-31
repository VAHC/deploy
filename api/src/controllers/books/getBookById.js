const { Book, Gender, Author, Review, User } = require('../../db')

const getBookById = async (id) => {
  const foundBook = await Book.findByPk(id, {
    include: [{
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
      },
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
  });

  if (!foundBook) throw new Error(`Book not found with ID: ${id}`);

  const Books = {
    id: foundBook.id,
    title: foundBook.title,
    publisher: foundBook.publisher,
    description: foundBook.description,
    price: foundBook.price,
    stock: foundBook.stock,
    publishedDate: foundBook.publishedDate,
    image: foundBook.image,
    createdDb: foundBook.createdDb,
    authors: foundBook.authors.map(el => el.name),
    genders: foundBook.genders.map(el => el.name),
    reviews: foundBook.reviews

    .map(r => {
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
  return Books;

};

module.exports = { getBookById };

