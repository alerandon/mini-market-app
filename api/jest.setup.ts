beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});

jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: {
    dropDatabase: jest.fn(),
    close: jest.fn(),
    collections: {},
  },
  model: jest.fn(),
  Schema: jest.fn(),
}));

jest.setTimeout(5000);
