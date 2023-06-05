const createOrder = require('../../controllers/orders/createOrder')

const createOrderHandler = async (req, res) => {

    const { date, quantity, price_total, id_user } = req.body;

    try {
        if (!date || !quantity || !price_total) {
            res.status(400).send('Please check that you have completed all the required fields')
        } else {
            const newOrder = await createOrder(date, quantity, price_total, id_user)
            res.status(200).send('Congratulations! Your order has been created!')
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = createOrderHandler;