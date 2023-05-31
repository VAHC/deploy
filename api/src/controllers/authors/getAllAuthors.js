const { Author } = require('../../db');

const getAllAuthors = async () => {
    const databaseAuthors = await Author.findAll({
    })

    const sortedAuthors= databaseAuthors.sort((a,b) => a.name.localeCompare(b.name))
    
    return sortedAuthors;
};

module.exports = getAllAuthors;