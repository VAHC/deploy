require('dotenv').config()
const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path')
const {
  DB_USER, DB_PASSWORD, DB_HOST
} = process.env

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/rayuela`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false // lets Sequelize know we can use pg-native for ~30% more speed
})

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });
const basename = path.basename(__filename)

const modelDefiners = []

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)))
  })

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize))
// Capitalizamos los nombres de los modelos ie: product => Product
const entries = Object.entries(sequelize.models)
const capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]])
sequelize.models = Object.fromEntries(capsEntries)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Book, Gender, Author, User, Review } = sequelize.models

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

// Relación N:N entre Libros y Géneros
Book.belongsToMany(Gender, { through: 'books_genders', timestamps: false })
Gender.belongsToMany(Book, { through: 'books_genders', timestamps: false })

// Relación N:N entre Libros y Autor
Book.belongsToMany(Author, { through: 'books_authors', timestamps: false })
Author.belongsToMany(Book, { through: 'books_authors', timestamps: false })

// Relacion 1:N entre Libro y Reseña
Book.hasMany(Review, { foreignKey: 'id_book', timestamps: false });
Review.belongsTo(Book, { foreignKey: 'id_book', timestamps: false });

// Relacion 1:N entre Usuario y Reseña
User.hasMany(Review, { foreignKey: 'id_user', timestamps: false });
Review.belongsTo(User, { foreignKey: 'id_user', timestamps: false });


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize // para importart la conexión { conn } = require('./db.js');
}
