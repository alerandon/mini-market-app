import { Hero, FeaturesGrid, PageContainer } from '@/components/layout';

export default function Home() {
  const features = [
    {
      icon: '💻',
      title: 'Electrónicos',
      description: 'Los últimos dispositivos y gadgets tecnológicos',
    },
    {
      icon: '🏠',
      title: 'Hogar',
      description: 'Todo lo que necesitas para tu hogar y estilo de vida',
    },
    {
      icon: '🚚',
      title: 'Envío Rápido',
      description: 'Entrega rápida y segura a tu puerta',
    },
  ];

  return (
    <PageContainer>
      <Hero
        title="🛒 Mini Market"
        description="Descubre nuestra amplia selección de productos de alta calidad. Desde electrónicos hasta artículos para el hogar, todo lo que necesitas en un solo lugar."
        buttonText="Ver Productos"
        buttonHref="/products"
      />

      <FeaturesGrid features={features} />
    </PageContainer>
  );
}
