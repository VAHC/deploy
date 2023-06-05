const { Order, Book, OrderDetail } = require('../../db');

const createOrderDetail = async (quantity, id_book, id_order, createdDb) => {

    const book = await Book.findByPk(id_book);
    if (!book) {
        throw Error(`No user has been found matching the id: ${id_book}`);
    }

    const order = await Order.findByPk(id_order);
    if (!order) {
        throw Error(`No book has been found matching the id: ${id_order}`);
    }
           
    const newOrderDetail = await OrderDetail.create({
        quantity,
        createdDb
    });
    
    await newOrderDetail.setBook(book);
    
    await newOrderDetail.setOrder(order);
    
    return newOrderDetail;
}

module.exports = createOrderDetail;