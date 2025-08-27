'use client';

import { useParams, useRouter } from 'next/navigation';
import { useProductDetail } from '@/hooks';
import { LoadingSpinner, ErrorDisplay } from '@/components/ui';
import {
  ProductDetailHeader,
  ProductImageGallery,
  ProductInfo,
  ProductActions,
} from '@/components/products';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const { product, loading, error, isFavorite, toggleFavorite, refetch } =
    useProductDetail(productId);

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return <LoadingSpinner message="Cargando producto..." />;
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={refetch} />;
  }

  if (!product) {
    return (
      <ErrorDisplay
        title="Producto no encontrado"
        message="No se pudo cargar la información del producto."
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <ProductDetailHeader onGoBack={handleGoBack} />

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            <ProductImageGallery product={product} />

            <div>
              <ProductInfo product={product} />
              <ProductActions
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                isAvailable={product.isAvailable}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
