const { Gender } = require('../../db');

const createGender = async (gender) => {
    const { name } = gender
    
    const newGender = await Gender.findOrCreate({
        where: { name },
    })
 
    return newGender;

}

module.exports = createGender;