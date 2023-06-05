const {Order, User, Address, OrderDetail} = require('../../db')

const createOrderAddress = async(date, state, quantity, price_total, id_user, createdDb, orderDetail) => {
    const user = await User.findByPk(id_user);

    if(!user){
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

    const shippingAddress = await Address.findOne({
        where: { id_user },
        attributes: ['address', 'city', 'state', 'country']
    });

    if (!shippingAddress) {
        throw Error(`No shipping address found for user with id: ${id_user}`);
    }

    await newOrder.setAddress(shippingAddress);

    const newOrderDetail = await OrderDetail.create(orderDetail);
    await newOrder.setOrderDetail(newOrderDetail);

    newOrder.email = user.email;

    await newOrder.save();

    return newOrder;
}

module.exports = createOrderAddress;
