const editOrderDetail = require('../../controllers/orderDetail/editOrderDetail')

const editOrderDetailHandler = async (req, res) => {

    const { id } = req.params
    const { quantity } = req.body;

    try {
        if (!quantity) {
            res.status(400).send('Please check that you have completed the required field')

        } else {
            const editedOrderDetail = await editOrderDetail(id, quantity)
            res.status(200).send('Congratulations! Your order detail has been updated!')
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = editOrderDetailHandler;