const { OrderDetail } = require('../../db');

const deleteOrderDetail = async (id) => {

    const orderDetailToDelete = await OrderDetail.findByPk(id);

    if (!orderDetailToDelete) {
        throw Error(`No order detail has been found matching the id: ${id}`)

    } else {
        orderDetailToDelete.deleted = true;
        await orderDetailToDelete.save();
    }
}

module.exports = deleteOrderDetail;