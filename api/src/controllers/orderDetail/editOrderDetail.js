const { OrderDetail } = require('../../db');

const editOrderDetail = async (id, quantity) => {

    const orderDetailToUpdate = await OrderDetail.findByPk(id);

    if (!orderDetailToUpdate) {
        throw Error(`No order detail has been found matching the id: ${id}`)

    } else {
        orderDetailToUpdate.quantity = quantity

        await orderDetailToUpdate.save()
    }
}

module.exports = editOrderDetail;