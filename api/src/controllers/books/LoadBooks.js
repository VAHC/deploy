const axios = require('axios')
const { Book,Gender,Author } = require('../../db')

const LoadAllBooks = async () => {
  const GetBooks = await axios('https://pi-henry-woad.vercel.app/imagen/jsonL.json')
  const LoadBooks = GetBooks.data.map(libro => {
    return ({
      title: libro.title,
      publisher: libro.publisher,
      description: libro.description,
      price: libro.price,
      stock: libro.stock,
      publishedDate: libro.publishedDate,
      image: libro.image
    })
  })
  await Book.bulkCreate(LoadBooks) // carga masiva

  const GetGenres = await axios('https://pi-henry-woad.vercel.app/imagen/genero.json')
  const LoadGenres = GetGenres.data.map(genres =>{
    return({
      name:genres.name
    })
  })
   await Gender.bulkCreate(LoadGenres) // carga masiva

   const GetAuthor = await axios('https://pi-henry-woad.vercel.app/imagen/autores.json')
   const LoadAuthor = GetAuthor.data.map(genres =>{
     return({
       name:genres.name
     })
   })
    await Author.bulkCreate(LoadAuthor) // carga masiva

  console.log('carge libros')
  return (LoadAuthor)
}
module.exports = { LoadAllBooks }
