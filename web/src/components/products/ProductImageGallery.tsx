import Image from 'next/image';
import { Product } from '@/lib/api';

interface ProductImageGalleryProps {
  product: Product;
}

export default function ProductImageGallery({
  product,
}: ProductImageGalleryProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
          priority
        />

        {/* Badge de stock */}
        <div className="absolute top-4 right-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shadow-lg ${
              product.isAvailable
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {product.isAvailable ? '✅ En stock' : '❌ Sin stock'}
          </span>
        </div>
      </div>
    </div>
  );
}
