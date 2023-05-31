const { Author } = require('../../db');

const createAuthor = async (author) => {
    const { name } = author
    
    const newAuthor = await Author.findOrCreate({
        where: { name },
    })
 
    return newAuthor;

}

module.exports = createAuthor;