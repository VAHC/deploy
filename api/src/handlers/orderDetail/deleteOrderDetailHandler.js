const deleteOrderDetail = require('../../controllers/orderDetail/deleteOrderDetail')

const deleteOrderDetailHandler = async (req, res) => {
    const { id } = req.params

    try {
            const deletedOrderDetail = await deleteOrderDetail(id)
            res.status(200).send('The order detail has been deleted')
        }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = deleteOrderDetailHandler;