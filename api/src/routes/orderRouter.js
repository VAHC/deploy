const { Router } = require('express');

const createOrderHandler = require('../handlers/order/createOrderHandler');
const createOrderAddressHandler = require('../handlers/order/createOrderAddressHandler')

const OrderRouter = Router();

OrderRouter.post('/', createOrderHandler)
OrderRouter.post('/', createOrderAddressHandler)


module.exports = OrderRouter