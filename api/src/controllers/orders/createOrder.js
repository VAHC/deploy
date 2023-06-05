const { Order, User, Address, OrderDetail } = require('../../db');

const createOrder = async (date, state, quantity, price_total, id_user, createdDb, address, orderDetail) => {

    const user = await User.findByPk(id_user);
    if (!user) {
        throw Error(`No user has been found matching the id: ${id_user}`);
    }
           
    const newOrder = await Order.create({
        date,
        state,
        quantity,
        price_total,
        createdDb
    });
    
    await newOrder.setUser(user); 
    
    const newAddress = await Address.create(address);
    await newOrder.setAddress(newAddress);

    const newOrderDetail = await OrderDetail.create(orderDetail);
    await newOrder.setOrderDetails(newOrderDetail);

    return newOrder;
}

module.exports = createOrder;