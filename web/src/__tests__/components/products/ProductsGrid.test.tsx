import { render, screen } from '@testing-library/react';
import { ProductsGrid } from '../../../components/products';
import { Product } from '../../../types';

// Mock de ProductCard
jest.mock('../../../components/products/ProductCard', () => {
  return function MockProductCard({ product }: { product: Product }) {
    return (
      <div data-testid={`product-card-${product._id}`}>
        <h3>{product.name}</h3>
        <p>{product.category}</p>
        <span>${product.price}</span>
      </div>
    );
  };
});

describe('ProductsGrid', () => {
  const mockProducts: Product[] = [
    {
      _id: '1',
      name: 'Producto 1',
      price: 100,
      isAvailable: true,
      category: 'electronics',
      image: '/images/product1.jpg',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    },
    {
      _id: '2',
      name: 'Producto 2',
      price: 200,
      isAvailable: true,
      category: 'clothing',
      image: '/images/product2.jpg',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    },
  ];

  it('renderiza todos los productos proporcionados', () => {
    render(<ProductsGrid products={mockProducts} />);

    mockProducts.forEach((product) => {
      expect(
        screen.getByTestId(`product-card-${product._id}`),
      ).toBeInTheDocument();
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });

  it('renderiza el grid con la clase CSS correcta', () => {
    const { container } = render(<ProductsGrid products={mockProducts} />);
    const grid = container.firstChild;

    expect(grid).toHaveClass('grid');
  });

  it('renderiza un mensaje cuando no hay productos', () => {
    const { container } = render(<ProductsGrid products={[]} />);

    // Cuando no hay productos, el grid debería estar vacío
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('mantiene el orden de los productos', () => {
    render(<ProductsGrid products={mockProducts} />);

    const productCards = screen.getAllByTestId(/^product-card-/);

    expect(productCards[0]).toHaveAttribute('data-testid', 'product-card-1');
    expect(productCards[1]).toHaveAttribute('data-testid', 'product-card-2');
  });

  it('pasa las props correctas a cada ProductCard', () => {
    render(<ProductsGrid products={mockProducts} />);

    // Verificar que los datos del primer producto se renderizan correctamente
    expect(screen.getByText('Producto 1')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();

    // Verificar que los datos del segundo producto se renderizan correctamente
    expect(screen.getByText('Producto 2')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
    expect(screen.getByText('clothing')).toBeInTheDocument();
  });
});
