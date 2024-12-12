// ./tests/controllers/OrderController.test.js

const request = require('supertest');
const express = require('express');
const OrderService = require('../../services/OrderService');
const OrderController = require('../../controllers/OrderController');

jest.mock('../../services/OrderService');


// TODO - add tests for error cases
const app = express();
app.use(express.json());
app.get('/orders', (req, res) => new OrderController().getAllOrders(req, res));
app.get('/orders/:id', (req, res) => new OrderController().getOrder(req, res));
app.post('/orders', (req, res) => new OrderController().createOrder(req, res));

describe('OrderController', () => {
    beforeEach(() => {
        OrderService.mockClear();
    });

    test('getAllOrders returns all orders', async () => {
        OrderService.prototype.getAllOrders.mockResolvedValue([{ id: 1 }, { id: 2 }]);
        const response = await request(app).get('/orders');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([{ id: 1 }, { id: 2 }]);
    });

    test('getOrder returns a specific order', async () => {
        const orderId = 1;
        OrderService.prototype.getOrder.mockResolvedValue({ id: orderId });
        const response = await request(app).get(`/orders/${orderId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ id: orderId });
    });

    test('createOrder creates a new order', async () => {
        const newOrder = { id: 3 };
        OrderService.prototype.createOrder.mockResolvedValue(newOrder);
        const response = await request(app).post('/orders').send(newOrder);
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(newOrder);
    });
});