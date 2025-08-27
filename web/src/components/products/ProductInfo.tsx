import { Product } from '@/lib/api';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4 border border-blue-200">
          📦 {product.category}
        </span>

        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {product.name}
        </h1>

        <div className="flex items-center mb-6">
          <span className="text-3xl lg:text-4xl font-bold text-blue-600">
            {product.price !== undefined && product.price !== null
              ? `$${product.price.toFixed(2)}`
              : 'Precio no disponible'}
          </span>
        </div>
      </div>

      {/* Información adicional */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Información del Producto
        </h3>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="font-medium text-gray-700">Disponibilidad:</span>
            <span
              className={`font-semibold ${
                product.isAvailable ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {product.isAvailable ? '✅ Disponible' : '❌ No disponible'}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="font-medium text-gray-700">Categoría:</span>
            <span className="text-gray-900 font-medium">
              {product.category}
            </span>
          </div>
        </div>
      </div>

      {/* Fechas */}
      <div className="text-sm text-gray-500 space-y-1">
        <p>
          <span className="font-medium">Agregado:</span>{' '}
          {new Date(product.createdAt).toLocaleDateString('es-ES')}
        </p>
        <p>
          <span className="font-medium">Actualizado:</span>{' '}
          {new Date(product.updatedAt).toLocaleDateString('es-ES')}
        </p>
      </div>
    </div>
  );
}
