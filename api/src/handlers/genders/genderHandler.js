const createGender = require('../../controllers/genders/createGender');
const getAllGenders = require('../../controllers/genders/getAllGenders');

const getGendersHandler = async (req, res) => {

    try {
        const genders = await getAllGenders()
        res.status(200).json(genders)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const postGenderHandler = async (req, res) => {

    const { gender } = req.body

    try {
        const newGender = await createGender(gender);
        res.status(200).json(newGender)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { getGendersHandler, postGenderHandler };