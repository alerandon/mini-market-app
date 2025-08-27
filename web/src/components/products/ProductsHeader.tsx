import Link from 'next/link';

export default function ProductsHeader() {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        🛒 Nuestros Productos
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Descubre nuestra amplia selección de productos de alta calidad.
        Encuentra exactamente lo que necesitas entre nuestras categorías.
      </p>

      {/* Navigation back to home */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
