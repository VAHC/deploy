const { Book, Author, Gender } = require('../../db');

const updateBook = async (id, title, publisher, description, price, stock, publishedDate, image, genders, authors) => {

    const bookToUpdate = await Book.findByPk(id);

    if (!bookToUpdate) {
        throw Error(`No book has been found matching the id: ${id}`)

    } else {
        bookToUpdate.title = title
        bookToUpdate.publisher = publisher
        bookToUpdate.description = description
        bookToUpdate.price = price
        bookToUpdate.stock = stock
        bookToUpdate.publishedDate = publishedDate
        bookToUpdate.image = image

        // Actualizar la relación entre el libro y los autores/géneros
        await Book.sequelize.transaction(async (transaction) => {
            
            // Eliminar las relaciones existentes
            await bookToUpdate.setAuthors([], { transaction });
            await bookToUpdate.setGenders([], { transaction });

            // Agregar las nuevas relaciones

            const authorsDb = await Author.findAll({
                where: { name: authors }
            })
            const gendersDb = await Gender.findAll({
                where: { name: genders }
            })

            await bookToUpdate.addAuthors(authorsDb, { transaction });
            await bookToUpdate.addGenders(gendersDb, { transaction });
        });
        await bookToUpdate.save()
    }
}

module.exports = updateBook;