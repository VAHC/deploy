const {Book, Author, Gender} = require('../../db');

const createBook = async (title, publisher, description, price, stock, publishedDate, image, createdDb, genders, authors) => {

    const newBook = await Book.create({
        title, 
        publisher, 
        description, 
        price, 
        stock,
        publishedDate, 
        image, 
        createdDb
    });

    const authorsDb = await Author.findAll({
        where: {name: authors}
    })

    newBook.addAuthor(authorsDb);

    const gendersDb = await Gender.findAll({
        where: {name: genders}
    })

    newBook.addGender(gendersDb);

    return newBook;

}

module.exports = createBook;