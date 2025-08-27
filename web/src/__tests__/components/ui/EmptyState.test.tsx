import { render, screen, fireEvent } from '@testing-library/react';
import EmptyState from '@/components/ui/EmptyState';

describe('EmptyState', () => {
  const defaultProps = {
    title: 'No hay resultados',
    description: 'No se encontraron productos con los filtros aplicados',
  };

  it('renderiza el título y descripción', () => {
    render(<EmptyState {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('muestra el icono por defecto', () => {
    render(<EmptyState {...defaultProps} />);

    expect(screen.getByText('🔍')).toBeInTheDocument();
  });

  it('muestra un icono personalizado', () => {
    const customIcon = '📦';
    render(<EmptyState {...defaultProps} icon={customIcon} />);

    expect(screen.getByText(customIcon)).toBeInTheDocument();
    expect(screen.queryByText('🔍')).not.toBeInTheDocument();
  });

  it('no muestra el botón de acción cuando no se proporciona', () => {
    render(<EmptyState {...defaultProps} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('muestra el botón de acción cuando se proporcionan actionText y onAction', () => {
    const mockAction = jest.fn();
    const actionText = 'Limpiar filtros';

    render(
      <EmptyState
        {...defaultProps}
        actionText={actionText}
        onAction={mockAction}
      />,
    );

    expect(
      screen.getByRole('button', { name: actionText }),
    ).toBeInTheDocument();
  });

  it('no muestra el botón cuando solo se proporciona actionText', () => {
    render(<EmptyState {...defaultProps} actionText="Acción" />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('no muestra el botón cuando solo se proporciona onAction', () => {
    const mockAction = jest.fn();
    render(<EmptyState {...defaultProps} onAction={mockAction} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('llama a onAction cuando se hace clic en el botón', () => {
    const mockAction = jest.fn();
    const actionText = 'Limpiar filtros';

    render(
      <EmptyState
        {...defaultProps}
        actionText={actionText}
        onAction={mockAction}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: actionText }));

    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('muestra el card por defecto', () => {
    render(<EmptyState {...defaultProps} />);

    const cardElement = screen
      .getByText(defaultProps.title)
      .closest('.bg-white');
    expect(cardElement).toBeInTheDocument();
  });

  it('no muestra el card cuando showCard es false', () => {
    render(<EmptyState {...defaultProps} showCard={false} />);

    const cardElement = screen
      .getByText(defaultProps.title)
      .closest('.bg-white');
    expect(cardElement).not.toBeInTheDocument();
  });

  it('tiene las clases CSS correctas', () => {
    render(<EmptyState {...defaultProps} />);

    const title = screen.getByText(defaultProps.title);
    const description = screen.getByText(defaultProps.description);

    expect(title).toHaveClass('text-xl', 'font-semibold', 'text-gray-900');
    expect(description).toHaveClass('text-gray-600');
  });

  it('el botón tiene las clases CSS correctas', () => {
    const mockAction = jest.fn();
    const actionText = 'Acción';

    render(
      <EmptyState
        {...defaultProps}
        actionText={actionText}
        onAction={mockAction}
      />,
    );

    const button = screen.getByRole('button', { name: actionText });
    expect(button).toHaveClass(
      'bg-blue-600',
      'text-white',
      'hover:bg-blue-700',
    );
  });
});
