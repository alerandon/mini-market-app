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
  Schema: jest.fn().mockImplementation(() => ({
    index: jest.fn(),
    set: jest.fn(),
    pre: jest.fn(),
    post: jest.fn(),
    plugin: jest.fn(),
    add: jest.fn(),
    remove: jest.fn(),
    path: jest.fn(),
    paths: {},
    tree: {},
    discriminators: {},
    methods: {},
    statics: {},
    virtuals: {},
    options: {},
  })),
}));

jest.setTimeout(5000);
