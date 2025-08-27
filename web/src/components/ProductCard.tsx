import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/api';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product._id}`}
      className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
    >
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="w-full h-48 object-cover"
          priority={false}
        />

        {/* Badge de stock */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
              product.isAvailable
                ? 'bg-green-500 text-white'
                : 'bg-gray-500 text-white'
            }`}
          >
            {product.isAvailable ? '✓ En stock' : '✗ Sin stock'}
          </span>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </p>

          <span className="text-xs font-medium text-gray-700 bg-blue-100 px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
