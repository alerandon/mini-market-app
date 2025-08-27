import '@testing-library/jest-dom';
// Import React for createElement
import React from 'react';

// Mock Next.js Image component globally
jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image(allProps: any) {
    // Extract valid img attributes and filter out Next.js specific props
    const {
      priority,
      width,
      height,
      fill,
      sizes,
      quality,
      loader,
      unoptimized,
      ...validImgProps
    } = allProps;

    return React.createElement('img', {
      'data-testid': 'next-image',
      ...validImgProps,
    });
  },
}));

// Mock Next.js Link component globally
jest.mock('next/link', () => ({
  __esModule: true,
  default: function Link({ href, children, ...props }: any) {
    return React.createElement(
      'a',
      {
        href,
        'data-testid': 'next-link',
        ...props,
      },
      children,
    );
  },
}));

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  })),
}));

// Mock Next.js navigation (App Router)
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: function Link({ children, href, ...props }: any) {
    return React.createElement('a', { href, ...props }, children);
  },
}));

// Global test setup
beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();
});

// Mock fetch globally
global.fetch = jest.fn();

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Configuración global para suprimir warnings específicos
const originalConsoleError = console.error;

beforeAll(() => {
  console.error = (...args: any[]) => {
    const message = args.join(' ');

    // Suprimir solo los warnings de act() que son específicos de testing
    if (
      message.includes(
        'An update to TestComponent inside a test was not wrapped in act(...)',
      )
    ) {
      return;
    }

    originalConsoleError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalConsoleError;
});
