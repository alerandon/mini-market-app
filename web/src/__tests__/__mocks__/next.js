import React from 'react';

// Global mocks for Next.js components to avoid repetition
// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image({ src, alt, priority, ...props }) {
    // Remove priority from props since img doesn't use it
    const { priority: _, width, height, ...imgProps } = props;
    return React.createElement('img', {
      src,
      alt,
      'data-testid': 'next-image',
      ...imgProps,
    });
  },
}));

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: function Link({ href, children, ...props }) {
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
