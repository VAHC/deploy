// const { getBookById } = require('../controllers/books/getBookById')
const { LoadAllBooks } = require('../../controllers/books/LoadBooks')
const searchBooks = require('../../controllers/books/searchBooks')
const getAllBooks = require('../../controllers/books/getAllBooks')
const pageController = require('../../controllers/books/pageController')

// const getBookByIdHandler = (req, res) => {
//   try {
//     res.status(200).send('funciona')
//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }
// }

const LoadBooksHandler = async (req, res) => {
  try {
    const response = await LoadAllBooks()
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getBooksHandler = async (req, res) => {

  const { title, authors } = req.query;

  try {
    const search = title || authors;
    // const searchField = title ? "title" : "authors";

    const results = search
      ? await searchBooks(search)
      : await getAllBooks();
    res.status(200).json(results)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


const getPage = async (req, res) => {
  const { number } = req.params

  try {
    const pageNumber = await pageController(number)
    res.status(200).json(pageNumber)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { LoadBooksHandler, getBooksHandler, getPage }
