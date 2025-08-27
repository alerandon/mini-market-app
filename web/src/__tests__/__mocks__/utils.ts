// @jest-environment node
// Este archivo contiene utilidades mock para testing

// Mock para fetch API
export const createMockFetch = (data: any, ok = true, status = 200) => {
  return jest.fn().mockResolvedValue({
    ok,
    status,
    json: jest.fn().mockResolvedValue(data),
    text: jest.fn().mockResolvedValue(JSON.stringify(data)),
  });
};

// Mock para errores de API
export const createMockFetchError = (error: string, status = 500) => {
  return jest.fn().mockRejectedValue(new Error(error));
};

// Mock para respuestas de paginación
export const createPaginatedMockResponse = (
  items: any[],
  currentPage = 1,
  totalItems = 100,
  itemsPerPage = 10,
) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    [Array.isArray(items) && items.length > 0
      ? Object.keys(items[0]).includes('_id')
        ? 'products'
        : 'items'
      : 'items']: items,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    },
  };
};

// Utilidades para testing
export const waitFor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock para localStorage
export const createLocalStorageMock = () => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    key: jest.fn((index: number) => Object.keys(store)[index] || null),
    get length() {
      return Object.keys(store).length;
    },
  };
};

// Mock para URL.createObjectURL
export const mockCreateObjectURL = jest.fn(() => 'mocked-url');

// Setup para window mocks
export const setupWindowMocks = () => {
  Object.defineProperty(window, 'localStorage', {
    value: createLocalStorageMock(),
    writable: true,
  });

  Object.defineProperty(window, 'URL', {
    value: {
      createObjectURL: mockCreateObjectURL,
      revokeObjectURL: jest.fn(),
    },
    writable: true,
  });

  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
    writable: true,
  });
};
