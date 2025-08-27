import { render, screen } from '@testing-library/react';
import { Icon } from '@/components/ui/Icon';

describe('Icon', () => {
  it('renderiza un SVG con propiedades por defecto', () => {
    const { container } = render(
      <Icon>
        <circle cx="12" cy="12" r="10" />
      </Icon>,
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
    expect(svg).toHaveAttribute('stroke-width', '2');
    expect(svg).toHaveAttribute('stroke-linecap', 'round');
    expect(svg).toHaveAttribute('stroke-linejoin', 'round');
  });

  it('aplica un tamaño personalizado como número', () => {
    const { container } = render(
      <Icon size={32}>
        <circle cx="12" cy="12" r="10" />
      </Icon>,
    );

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('aplica un tamaño personalizado como string', () => {
    const { container } = render(
      <Icon size="2rem">
        <circle cx="12" cy="12" r="10" />
      </Icon>,
    );

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '2rem');
    expect(svg).toHaveAttribute('height', '2rem');
  });

  it('aplica clases CSS personalizadas', () => {
    const customClass = 'text-blue-500 custom-icon';
    const { container } = render(
      <Icon className={customClass}>
        <circle cx="12" cy="12" r="10" />
      </Icon>,
    );

    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('text-blue-500', 'custom-icon');
  });

  it('permite sobrescribir propiedades por defecto', () => {
    const { container } = render(
      <Icon
        viewBox="0 0 32 32"
        fill="red"
        stroke="blue"
        strokeWidth={3}
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <circle cx="16" cy="16" r="10" />
      </Icon>,
    );

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 32 32');
    expect(svg).toHaveAttribute('fill', 'red');
    expect(svg).toHaveAttribute('stroke', 'blue');
    expect(svg).toHaveAttribute('stroke-width', '3');
    expect(svg).toHaveAttribute('stroke-linecap', 'square');
    expect(svg).toHaveAttribute('stroke-linejoin', 'miter');
  });

  it('renderiza el contenido hijo correctamente', () => {
    render(
      <Icon>
        <circle cx="12" cy="12" r="10" data-testid="circle" />
        <path d="M8 12h8" data-testid="path" />
      </Icon>,
    );

    expect(screen.getByTestId('circle')).toBeInTheDocument();
    expect(screen.getByTestId('path')).toBeInTheDocument();
  });

  it('pasa props adicionales al elemento SVG', () => {
    render(
      <Icon data-testid="custom-icon" aria-label="Custom icon">
        <circle cx="12" cy="12" r="10" />
      </Icon>,
    );

    const svg = screen.getByTestId('custom-icon');
    expect(svg).toHaveAttribute('aria-label', 'Custom icon');
  });

  it('mantiene la estructura del SVG correcta', () => {
    const { container } = render(
      <Icon>
        <circle cx="12" cy="12" r="10" />
      </Icon>,
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.children.length).toBe(1);
    expect(svg?.children[0].tagName).toBe('circle');
  });
});
