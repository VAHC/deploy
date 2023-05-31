const allBooks = require('./getAllBooks')

const pageController = async (number) => {
const books = await allBooks();
const pages = Math.ceil((books.length / 9))

const lastIndex = number * 9
const firstIndex = number * 9 - 9

let result = []

if (number <= pages) {
    result = books.slice(firstIndex, lastIndex)
}
return result
}

module.exports = pageController;