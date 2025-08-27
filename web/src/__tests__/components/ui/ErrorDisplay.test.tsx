import { render, screen, fireEvent } from '@testing-library/react';
import ErrorDisplay from '@/components/ui/ErrorDisplay';

describe('ErrorDisplay', () => {
  const defaultProps = {
    message: 'Error al cargar los datos',
  };

  it('renderiza con el título por defecto', () => {
    render(<ErrorDisplay {...defaultProps} />);

    expect(screen.getByText('Ups, algo salió mal')).toBeInTheDocument();
  });

  it('renderiza con un título personalizado', () => {
    const customTitle = 'Error de conexión';
    render(<ErrorDisplay {...defaultProps} title={customTitle} />);

    expect(screen.getByText(customTitle)).toBeInTheDocument();
  });

  it('renderiza el mensaje de error', () => {
    render(<ErrorDisplay {...defaultProps} />);

    expect(screen.getByText(defaultProps.message)).toBeInTheDocument();
  });

  it('muestra el icono de error', () => {
    render(<ErrorDisplay {...defaultProps} />);

    expect(screen.getByText('⚠️')).toBeInTheDocument();
  });

  it('no muestra el botón de reintentar cuando no se proporciona onRetry', () => {
    render(<ErrorDisplay {...defaultProps} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('muestra el botón de reintentar cuando se proporciona onRetry', () => {
    const mockRetry = jest.fn();
    render(<ErrorDisplay {...defaultProps} onRetry={mockRetry} />);

    expect(
      screen.getByRole('button', { name: 'Reintentar' }),
    ).toBeInTheDocument();
  });

  it('muestra texto personalizado del botón de reintentar', () => {
    const mockRetry = jest.fn();
    const customRetryText = 'Intentar de nuevo';
    render(
      <ErrorDisplay
        {...defaultProps}
        onRetry={mockRetry}
        retryText={customRetryText}
      />,
    );

    expect(
      screen.getByRole('button', { name: customRetryText }),
    ).toBeInTheDocument();
  });

  it('llama a onRetry cuando se hace clic en el botón', () => {
    const mockRetry = jest.fn();
    render(<ErrorDisplay {...defaultProps} onRetry={mockRetry} />);

    fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }));

    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it('muestra el card por defecto', () => {
    render(<ErrorDisplay {...defaultProps} />);

    const cardElement = screen
      .getByText(defaultProps.message)
      .closest('.bg-white');
    expect(cardElement).toBeInTheDocument();
  });

  it('no muestra el card cuando showCard es false', () => {
    render(<ErrorDisplay {...defaultProps} showCard={false} />);

    const cardElement = screen
      .getByText(defaultProps.message)
      .closest('.bg-white');
    expect(cardElement).not.toBeInTheDocument();
  });

  it('tiene las clases CSS correctas en el botón', () => {
    const mockRetry = jest.fn();
    render(<ErrorDisplay {...defaultProps} onRetry={mockRetry} />);

    const button = screen.getByRole('button', { name: 'Reintentar' });
    expect(button).toHaveClass(
      'bg-blue-600',
      'text-white',
      'hover:bg-blue-700',
    );
  });
});
