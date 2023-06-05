const createOrderDetail = require('../../controllers/orderDetail/createOrderDetail')

const createOrderDetailHandler = async (req, res) => {

    const { quantity, id_book, id_order } = req.body;

    try {
        if (!quantity) {
            res.status(400).send('Please check that you have completed the required field')
        } else {
            const newOrderDetail = await createOrderDetail(quantity, id_book, id_order)
            res.status(200).send('Congratulations! Your order detail has been created!')
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = createOrderDetailHandler;