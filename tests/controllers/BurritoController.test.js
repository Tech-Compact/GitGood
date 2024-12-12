// ./tests/controllers/BurritoController.test.js

const request = require('supertest');
const express = require('express');
const BurritoService = require('../../services/BurritoService');
const BurritoController = require('../../controllers/BurritoController');

jest.mock('../../services/BurritoService');

const app = express();
app.use(express.json());
app.get('/burritos', (req, res) => new BurritoController().getAllBurritos(req, res));
app.post('/burritos', (req, res) => new BurritoController().createBurrito(req, res));

describe('BurritoController', () => {
    beforeEach(() => {
        BurritoService.mockClear();
    });

    test('getAllBurritos returns all burritos', async () => {
        BurritoService.prototype.getAllBurritos.mockResolvedValue([{ id: 1 }, { id: 2 }]);
        const response = await request(app).get('/burritos');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([{ id: 1 }, { id: 2 }]);
    });

    test('createBurrito creates a new burrito', async () => {
        const newBurrito = { id: 3 };
        BurritoService.prototype.createBurrito.mockResolvedValue(newBurrito);
        const response = await request(app).post('/burritos').send(newBurrito);
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(newBurrito);
    });
});