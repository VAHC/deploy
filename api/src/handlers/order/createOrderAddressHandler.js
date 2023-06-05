const createOrderAddress = require('../../controllers/orders/createOrderAddress')

const createOrderAddressHandler = async (req, res) => {

    const { date, quantity, price_total, id_user, orderDetail } = req.body;

    try {
        if (!date || !quantity || !price_total) {
            res.status(400).send('Please check that you have completed all the required fields')
        } else {
            const newOrder = await createOrderAddress(date, quantity, price_total, id_user, orderDetail)
            res.status(200).send('Congratulations! Your order has been created!')
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = createOrderAddressHandler;