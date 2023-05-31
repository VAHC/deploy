const deleteBook = require('../../controllers/books/deleteBook')

const deleteBookHandler = async (req, res) => {
    const { id } = req.params

    try {
            const deletedBook = await deleteBook(id)
            res.status(200).send('The book has been deleted')
        }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = deleteBookHandler;