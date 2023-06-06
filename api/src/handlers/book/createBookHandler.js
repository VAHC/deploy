const createBook = require('../../controllers/books/createBook')

const createBookHandler = async (req,res) => {

    const {title, publisher, description, price, stock, publishedDate, image, createdDb, genders, authors} = req.body;

    try {
        if (!title || !publisher || !description || !price || !stock || !publishedDate || !image) {
            res.status(400).send('Please check that you have completed all the required fields')
        } else {
            const newBook = await createBook(title, publisher, description, price, stock, publishedDate, image, createdDb, genders, authors)
            res.status(200).send('Congratulations! Your book has been created!')}
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = createBookHandler;