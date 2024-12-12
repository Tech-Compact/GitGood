// ./tests/services/OrderService.test.js

const db = require('../../models');
const OrderService = require('../../services/OrderService');

jest.mock('../../models');

describe('OrderService', () => {
    beforeEach(() => {
        db.Order.create.mockClear();
        db.Order.findByPk.mockClear();
        db.Order.findAll.mockClear();
    });

    describe('getAllOrders', () => {
        test('should get all Orders', async () => {
            // Arrange: Mock the findAll method to return some dummy data
            const expectedOrders = [{ id: 1, name: 'Order1' }, { id: 2, name: 'Order2' }];
            db.Order.findAll.mockResolvedValueOnce(expectedOrders);

            // Act: Call the getAllOrders method
            const orderService = new OrderService();
            const result = await orderService.getAllOrders();

            // Assert: Check that the mock implementation is used
            expect(result).toEqual(expectedOrders);
        });
    });

    test('getOrder returns the order with associated order items and burritos', async () => {
        const orderId = 1;
        const expectedOrder = { id: orderId, orderItems: [{ id: 1, burrito: { id: 1 } }] };
        db.Order.findByPk.mockResolvedValue(expectedOrder);
        const orderService = new OrderService();
        const result = await orderService.getOrder(orderId);
        expect(result).toEqual(expectedOrder);
    });

    // TODO - fix unit test for createOrder
    test('createOrder creates a new order and associated order items', async () => {
        const burritoData = { id: 1, name: 'test burrito', price: 5, size: 'small' };
        const burritoWrapper = [{dataValues: burritoData}];
        const orderItemData = { quantity: 2, burrito: burritoData };
        const orderData = { id: 1, totalCost: orderItemData.quantity * orderItemData.burrito.price, };
        const createdOrder = { 
            ...orderData, 
            orderItems: [orderItemData]
        };
        const expected = { order: orderData, orderItems: [orderItemData] };
        db.Order.create.mockResolvedValue(orderData);
        db.Burrito.findOrCreate.mockResolvedValue([burritoWrapper]);
        db.OrderItem.create.mockResolvedValue(orderItemData);
        const orderService = new OrderService();
        const result = await orderService.createOrder(createdOrder);
        expect(result).toEqual(expected);
    });
});