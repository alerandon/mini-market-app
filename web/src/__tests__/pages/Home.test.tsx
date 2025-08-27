import { render, screen } from '@testing-library/react';
import Home from '../../app/page';

// Mock de los componentes de layout
jest.mock('../../components/layout', () => ({
  Hero: ({ title, description, buttonText, buttonHref }: any) => (
    <div data-testid="hero">
      <h1>{title}</h1>
      <p>{description}</p>
      <a href={buttonHref}>{buttonText}</a>
    </div>
  ),
  FeaturesGrid: ({ features }: any) => (
    <div data-testid="features-grid">
      {features.map((feature: any, index: number) => (
        <div key={index} data-testid={`feature-${index}`}>
          <span>{feature.icon}</span>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  ),
  PageContainer: ({ children }: any) => (
    <div data-testid="page-container">{children}</div>
  ),
}));

describe('Home Page', () => {
  it('renderiza correctamente los elementos principales', () => {
    render(<Home />);

    expect(screen.getByTestId('page-container')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('features-grid')).toBeInTheDocument();
  });

  it('renderiza el Hero con el contenido correcto', () => {
    render(<Home />);

    expect(screen.getByText('🛒 Mini Market')).toBeInTheDocument();
    expect(
      screen.getByText(/Descubre nuestra amplia selección de productos/),
    ).toBeInTheDocument();
    expect(screen.getByText('Ver Productos')).toBeInTheDocument();
  });

  it('el botón del Hero enlaza a la página de productos', () => {
    render(<Home />);

    const productLink = screen.getByText('Ver Productos');
    expect(productLink).toHaveAttribute('href', '/products');
  });

  it('renderiza todas las características definidas', () => {
    render(<Home />);

    // Verificar que las 3 características se renderizan
    expect(screen.getByTestId('feature-0')).toBeInTheDocument();
    expect(screen.getByTestId('feature-1')).toBeInTheDocument();
    expect(screen.getByTestId('feature-2')).toBeInTheDocument();
  });

  it('renderiza la característica de Electrónicos correctamente', () => {
    render(<Home />);

    const electronicsFeature = screen.getByTestId('feature-0');
    expect(electronicsFeature).toBeInTheDocument();

    expect(screen.getByText('💻')).toBeInTheDocument();
    expect(screen.getByText('Electrónicos')).toBeInTheDocument();
    expect(
      screen.getByText('Los últimos dispositivos y gadgets tecnológicos'),
    ).toBeInTheDocument();
  });

  it('renderiza la característica de Hogar correctamente', () => {
    render(<Home />);

    const homeFeature = screen.getByTestId('feature-1');
    expect(homeFeature).toBeInTheDocument();

    expect(screen.getByText('🏠')).toBeInTheDocument();
    expect(screen.getByText('Hogar')).toBeInTheDocument();
    expect(
      screen.getByText('Todo lo que necesitas para tu hogar y estilo de vida'),
    ).toBeInTheDocument();
  });

  it('renderiza la característica de Envío Rápido correctamente', () => {
    render(<Home />);

    const shippingFeature = screen.getByTestId('feature-2');
    expect(shippingFeature).toBeInTheDocument();

    expect(screen.getByText('🚚')).toBeInTheDocument();
    expect(screen.getByText('Envío Rápido')).toBeInTheDocument();
    expect(
      screen.getByText('Entrega rápida y segura a tu puerta'),
    ).toBeInTheDocument();
  });

  it('pasa las características correctas a FeaturesGrid', () => {
    render(<Home />);

    // Verificar que todas las características están presentes
    const expectedFeatures = [
      { icon: '💻', title: 'Electrónicos' },
      { icon: '🏠', title: 'Hogar' },
      { icon: '🚚', title: 'Envío Rápido' },
    ];

    expectedFeatures.forEach(({ icon, title }) => {
      expect(screen.getByText(icon)).toBeInTheDocument();
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('tiene una estructura de página válida', () => {
    const { container } = render(<Home />);

    // Verificar que hay un PageContainer que envuelve todo
    const pageContainer = container.querySelector(
      '[data-testid="page-container"]',
    );
    expect(pageContainer).toBeInTheDocument();

    // Verificar que Hero y FeaturesGrid están dentro del PageContainer
    const hero = container.querySelector('[data-testid="hero"]') as HTMLElement;
    const featuresGrid = container.querySelector(
      '[data-testid="features-grid"]',
    ) as HTMLElement;

    expect(pageContainer).toContainElement(hero);
    expect(pageContainer).toContainElement(featuresGrid);
  });
});
