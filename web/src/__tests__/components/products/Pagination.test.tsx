import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/components/products/Pagination';

describe('Pagination', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('no renderiza nada cuando totalPages es 1 o menos', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('renderiza la paginación cuando totalPages es mayor que 1', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(screen.getByText('Siguiente')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renderiza todos los números de página', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('deshabilita el botón "Anterior" en la primera página', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const previousButton = screen.getByText('Anterior');
    expect(previousButton).toBeDisabled();
    expect(previousButton).toHaveClass(
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
    );
  });

  it('deshabilita el botón "Siguiente" en la última página', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const nextButton = screen.getByText('Siguiente');
    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveClass(
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
    );
  });

  it('habilita ambos botones en páginas intermedias', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const previousButton = screen.getByText('Anterior');
    const nextButton = screen.getByText('Siguiente');

    expect(previousButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it('resalta la página actual', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveClass(
      'bg-blue-600',
      'text-white',
      'shadow-lg',
    );
  });

  it('no resalta las páginas que no son actuales', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const otherPageButton = screen.getByText('1');
    expect(otherPageButton).toHaveClass(
      'bg-gray-100',
      'text-gray-700',
      'hover:bg-gray-200',
    );
    expect(otherPageButton).not.toHaveClass('bg-blue-600', 'text-white');
  });

  it('llama a onPageChange con el número correcto al hacer clic en una página', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    fireEvent.click(screen.getByText('3'));

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('llama a onPageChange con la página anterior al hacer clic en "Anterior"', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    fireEvent.click(screen.getByText('Anterior'));

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('llama a onPageChange con la página siguiente al hacer clic en "Siguiente"', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    fireEvent.click(screen.getByText('Siguiente'));

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('no llama a onPageChange cuando se hace clic en un botón deshabilitado', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    fireEvent.click(screen.getByText('Anterior'));

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('aplica las clases CSS correctas al contenedor', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={mockOnPageChange}
      />,
    );

    const mainContainer = container.querySelector('.mt-16');
    const navContainer = container.querySelector('nav');

    expect(mainContainer).toHaveClass('mt-16', 'flex', 'justify-center');
    expect(navContainer).toHaveClass(
      'bg-white',
      'rounded-lg',
      'shadow-md',
      'p-4',
    );
  });

  it('maneja correctamente casos edge con pocas páginas', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={2}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.queryByText('3')).not.toBeInTheDocument();
  });
});
