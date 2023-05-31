const getAllBooks = require('./getAllBooks');

// Esta función NO distingue si lo que se busca es un title o un authors

const searchBooks = async (search) => {
    const allBooks = await getAllBooks();

    if (search){

        const booksFiltered = allBooks.filter((book) => {

            const lowerCaseSearch = search.toLowerCase();
           
            return (
                book.title.toLowerCase().includes(lowerCaseSearch) ||
                book.authors.some((author) => author.toLowerCase().includes(lowerCaseSearch))
            )
        })
    //     console.log(booksFiltered);
    //     if (booksFiltered.length === 0) {
    //         throw Error(`No books have been found matching your search:'${search}'`)
    //     } else {
    //     return booksFiltered;
    // }
    return booksFiltered;
}
};


// Esta función SÍ distingue si lo que se busca es un title o un authors.

// const searchBooks = async (search, searchField) => {
//     const allBooks = await getAllBooks();

//     console.log(search)
//     console.log(searchField)

//     if (search){
//         const lowerCaseSearch = search.toLowerCase();

//         const booksFiltered = allBooks.filter((book) => {

//             if (searchField === 'title') {
//                 return book.title.toLowerCase().includes(lowerCaseSearch)
//             } if (searchField === 'authors') {
//                 return book.authors.some((author) => author.toLowerCase().includes(lowerCaseSearch))
//             }
//         })

//         if (booksFiltered.length === 0) {
//             throw Error(`No books have been found matching your search:'${search}'`)
//         } else {
//         return booksFiltered;
//     }
// }
// };

module.exports = searchBooks;
