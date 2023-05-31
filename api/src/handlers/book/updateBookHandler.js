const updateBook = require('../../controllers/books/updateBook');

const updateBookHandler = async (req, res) => {

    // const { id } = req.params
    const { id, title, publisher, description, price, stock, publishedDate, image, genders, authors } = req.body;

    try {
        if (!title || !publisher || !description || !price || !stock || !publishedDate || !image) {
            res.status(400).send('Please check that you have completed all the required fields')
        
        } else {
            const updatedBook = await updateBook(id, title, publisher, description, price, stock, publishedDate, image, genders, authors)
            res.status(200).send('Congratulations! Your book has been updated!')
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = updateBookHandler;