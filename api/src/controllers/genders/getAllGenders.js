const { Gender} = require('../../db');

const getAllGenders = async () => {
    const databaseGenders = await Gender.findAll({
    })
    console.log(databaseGenders);

    const sortedGenders= databaseGenders.sort((a,b) => a.name.localeCompare(b.name))
    
    return sortedGenders;
};

module.exports = getAllGenders;