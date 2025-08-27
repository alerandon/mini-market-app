import { render, screen } from '@testing-library/react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renderiza con el mensaje por defecto', () => {
    render(<LoadingSpinner />);

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('renderiza con un mensaje personalizado', () => {
    const customMessage = 'Procesando datos...';
    render(<LoadingSpinner message={customMessage} />);

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('aplica la clase de tamaño pequeño correctamente', () => {
    render(<LoadingSpinner size="sm" />);

    const spinner = screen.getByText('Cargando...').previousElementSibling;
    expect(spinner).toHaveClass('h-6', 'w-6');
  });

  it('aplica la clase de tamaño mediano por defecto', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByText('Cargando...').previousElementSibling;
    expect(spinner).toHaveClass('h-12', 'w-12');
  });

  it('aplica la clase de tamaño grande correctamente', () => {
    render(<LoadingSpinner size="lg" />);

    const spinner = screen.getByText('Cargando...').previousElementSibling;
    expect(spinner).toHaveClass('h-16', 'w-16');
  });

  it('muestra el card por defecto', () => {
    render(<LoadingSpinner />);

    const cardElement = screen.getByText('Cargando...').closest('.bg-white');
    expect(cardElement).toBeInTheDocument();
  });

  it('no muestra el card cuando showCard es false', () => {
    render(<LoadingSpinner showCard={false} />);

    const cardElement = screen.getByText('Cargando...').closest('.bg-white');
    expect(cardElement).not.toBeInTheDocument();
  });

  it('tiene las clases de animación correctas', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByText('Cargando...').previousElementSibling;
    expect(spinner).toHaveClass(
      'animate-spin',
      'rounded-full',
      'border-b-2',
      'border-blue-600',
    );
  });
});
