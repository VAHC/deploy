const { Book } = require('../../db');

const deleteBook = async (id) => {

    const bookToDelete = await Book.findByPk(id);

    if (!bookToDelete) {
        throw Error(`No book has been found matching the id: ${id}`)

    } else {
        bookToDelete.deleted = !bookToDelete.deleted;
        await bookToDelete.save()
    }
}

module.exports = deleteBook;