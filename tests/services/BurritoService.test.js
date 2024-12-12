const BurritoService = require('../../services/BurritoService');
const db = require('../../models');

// Mock the entire db module
jest.mock('../../models');

describe('BurritoService', () => {
  let service;

  beforeAll(() => {
    service = new BurritoService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllBurritos', () => {
    test('should get all burritos', async () => {
      // Arrange: Mock the findAll method to return some dummy data
      const findAllmock = jest.fn().mockResolvedValueOnce([{ id: 1, name: 'Burrito1' }, { id: 2, name: 'Burrito2' }]);
      db.Burrito.findAll = findAllmock;

      // Act: Call the getAllBurritos method
      const result = await service.getAllBurritos();

      // Assert: Check that the mock implementation is used
      expect(result).toEqual([{ id: 1, name: 'Burrito1' }, { id: 2, name: 'Burrito2' }]);
    });
  });

  describe('createBurrito', () => {
    test('should create a new burrito', async () => {
      const newData = { name: 'NewBurrito', size: 'Medium', price: 8.99 };

      // Arrange: Mock the create method on an instance of Burrito
      const createMock = jest.fn().mockResolvedValueOnce({ id: 3, ...newData });
      db.Burrito.create = createMock;

      // Act: Call the createBurrito method
      const result = await service.createBurrito(newData);

      // Assert: Check that the mock implementation is used
      expect(result).toEqual({ id: 3, ...newData });
      // Assert that the create method was called with the correct arguments
      expect(createMock).toHaveBeenCalledWith(newData);
    });
  });
});
