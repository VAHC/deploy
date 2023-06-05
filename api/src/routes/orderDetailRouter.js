const { Router } = require('express');

const createOrderDetailHandler = require('../handlers/orderDetail/createOrderDetailHandler');
const deleteOrderDetailHandler = require('../handlers/orderDetail/deleteOrderDetailHandler')
const editOrderDetailHandler = require('../handlers/orderDetail/editOrderDetailHandler')

const OrderDetailRouter = Router();

OrderDetailRouter.post('/', createOrderDetailHandler)
OrderDetailRouter.put('/delete/:id', deleteOrderDetailHandler)
OrderDetailRouter.put('/:id', editOrderDetailHandler)

module.exports = OrderDetailRouter