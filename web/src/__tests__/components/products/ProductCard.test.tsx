import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/products/ProductCard';
import { mockProduct } from '@/__tests__/__mocks__/products';

describe('ProductCard', () => {
  it('renderiza la información básica del producto', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockProduct.price.toFixed(2)}`),
    ).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
  });

  it('renderiza la imagen del producto con alt text correcto', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText(mockProduct.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.image);
  });

  it('muestra el badge de "En stock" cuando el producto está disponible', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('✓ En stock')).toBeInTheDocument();
  });

  it('muestra el badge de "Sin stock" cuando el producto no está disponible', () => {
    const unavailableProduct = { ...mockProduct, isAvailable: false };
    render(<ProductCard product={unavailableProduct} />);

    expect(screen.getByText('✗ Sin stock')).toBeInTheDocument();
  });

  it('aplica estilos correctos para producto disponible', () => {
    render(<ProductCard product={mockProduct} />);

    const badge = screen.getByText('✓ En stock');
    expect(badge).toHaveClass('bg-green-500', 'text-white');
  });

  it('aplica estilos correctos para producto no disponible', () => {
    const unavailableProduct = { ...mockProduct, isAvailable: false };
    render(<ProductCard product={unavailableProduct} />);

    const badge = screen.getByText('✗ Sin stock');
    expect(badge).toHaveClass('bg-gray-500', 'text-white');
  });

  it('crea un enlace correcto al detalle del producto', () => {
    render(<ProductCard product={mockProduct} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/products/${mockProduct._id}`);
  });

  it('tiene las clases CSS correctas para hover effects', () => {
    render(<ProductCard product={mockProduct} />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass(
      'block',
      'bg-white',
      'rounded-lg',
      'shadow-lg',
      'hover:shadow-xl',
      'transition-all',
      'hover:-translate-y-1',
    );
  });

  it('formatea el precio correctamente', () => {
    const productWithDecimalPrice = { ...mockProduct, price: 1234.56 };
    render(<ProductCard product={productWithDecimalPrice} />);

    expect(screen.getByText('$1234.56')).toBeInTheDocument();
  });

  it('formatea el precio sin decimales cuando es un entero', () => {
    const productWithIntegerPrice = { ...mockProduct, price: 1000 };
    render(<ProductCard product={productWithIntegerPrice} />);

    expect(screen.getByText('$1000.00')).toBeInTheDocument();
  });

  it('aplica clases CSS correctas al precio', () => {
    render(<ProductCard product={mockProduct} />);

    const price = screen.getByText(`$${mockProduct.price.toFixed(2)}`);
    expect(price).toHaveClass('text-xl', 'font-bold', 'text-blue-600');
  });

  it('aplica clases CSS correctas al nombre del producto', () => {
    render(<ProductCard product={mockProduct} />);

    const name = screen.getByText(mockProduct.name);
    expect(name).toHaveClass(
      'text-lg',
      'font-bold',
      'text-gray-900',
      'line-clamp-2',
    );
  });

  it('aplica clases CSS correctas a la categoría', () => {
    render(<ProductCard product={mockProduct} />);

    const category = screen.getByText(mockProduct.category);
    expect(category).toHaveClass(
      'text-xs',
      'font-medium',
      'text-gray-700',
      'bg-blue-100',
      'rounded-full',
    );
  });
});
