const db = require('../models')

class OrderService {

    async getAllOrders() {
        return await db.Order.findAll({
            include: [
                {
                    model: db.OrderItem,
                    include: [db.Burrito],
                },
            ],
        });
    }

    async getOrder(orderId) {
        return await db.Order.findByPk(orderId, {
            include: [
                {
                    model: db.OrderItem,
                    include: [db.Burrito],
                },
            ],
        });
    }

    async createOrder(data) {
        const {orderItems, ...orderData} = data;
        // calculate total cost
        let total = 0;
        orderItems.forEach(element => {
            total += element.quantity * element.burrito.price;
        })
        data.totalCost = total;

        const order = await db.Order.create(data);

        // Create OrderItems and associate them with the Order
        const createdOrderItems = await Promise.all(orderItems.map(async (item) => {
            const { burrito, ...itemData } = item;

            // Find or create the associated Burrito
            const createdBurrito = await db.Burrito.findOrCreate({
                where: { name: burrito.name, size: burrito.size }, 
                defaults: burrito,
            });
            
            // Create the OrderItem and associate it with the Order and Burrito
            const orderItem = await db.OrderItem.create({
                ...itemData,
                BurritoId: createdBurrito[0].dataValues.id, 
                OrderId: order.id, 
            });

            return orderItem;
        }));

        return { order, orderItems: createdOrderItems }
    }

}

module.exports = OrderService;
