const OrderService = require('../services/OrderService');
const orderService = new OrderService();

class OrderController {

    async getAllOrders(req, res) {
        try {
            const orders = await orderService.getAllOrders();
            res.json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            return res.status(404).send('Not Found');
        }
    }

    async getOrder(req, res) {
        try {
            const orderId = req.params.id;
            const order = await orderService.getOrder(orderId);
            // Check if the order is not found (null) and throw an error
            if (order === null) {
                throw new Error(`Order with ID ${orderId} not found`);
            }
            res.json(order);
        } catch (error) {
            console.error('Error fetching an order:', error);
            return res.status(404).send('Not Found');
        }
    }

    async createOrder(req, res) {
        try {
            const newOrder = req.body;
            const createOrder = await orderService.createOrder(newOrder);
            res.status(201).json(createOrder);
        } catch (error) {
            console.error('Error creating orders:', error)
            res.status(500).send('Internal Server Error')
        }
    }

}

module.exports = OrderController;