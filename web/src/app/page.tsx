import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            🛒 Mini Market
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubre nuestra amplia selección de productos de alta calidad.
            Desde electrónicos hasta artículos para el hogar, todo lo que
            necesitas en un solo lugar.
          </p>

          <div className="space-y-4 mb-12">
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Ver Productos
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Electrónicos
              </h3>
              <p className="text-gray-600">
                Los últimos dispositivos y gadgets tecnológicos
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Hogar
              </h3>
              <p className="text-gray-600">
                Todo lo que necesitas para tu hogar y estilo de vida
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Envío Rápido
              </h3>
              <p className="text-gray-600">
                Entrega rápida y segura a tu puerta
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
