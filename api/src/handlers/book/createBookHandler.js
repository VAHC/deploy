const createBook = require('../../controllers/books/createBook')
const {URL_Railway} = require('../../../rutas')
require('dotenv').config()
const cloudinary = require('cloudinary').v2;

const {
    CLOUD_NAME, CLOUD_API, CLOUD_SECRET
  } = process.env

  // Configuration 
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API,
    api_secret: CLOUD_SECRET
  });

const createBookHandler = async (req,res) => {

    const {title, publisher, description, price, stock, publishedDate, createdDb, genders, authors} = req.body;
    
    // const { secure_url } = rta;
    //   console.log(secure_url);

    try {

      UrlImagen=URL_Railway+'/'+req.file.filename;
    let NameSinextencion=req.file.filename.slice(0,req.file.filename.length - 4)
     console.log(UrlImagen);
    //const rta =  cloudinary.uploader.upload(UrlImagen, {public_id: NameSinextencion})
    const resup = await cloudinary.uploader.upload(UrlImagen, {public_id: NameSinextencion})
   const { secure_url } = resup;
   console.log(secure_url);

        if (!title || !publisher || !description || !price || !stock || !publishedDate || !secure_url) {
            res.status(400).send('Please check that you have completed all the required fields')
        } else {
            const newBook = await createBook(title, publisher, description, price, stock, publishedDate, secure_url, createdDb, genders, authors)
            res.status(200).send('Congratulations! Your book has been created!')}
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = createBookHandler;