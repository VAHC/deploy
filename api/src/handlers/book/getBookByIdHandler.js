const { getBookById } = require('../../controllers/books/getBookById')

const getBookByIdHandler = async (req, res) => {
  const { id } = req.params;
  const idB = id.toUpperCase();
  try {
    const books = await getBookById(idB);

    return res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getBookByIdHandler }