import { Product } from '@/lib/api';
import ProductCard from './ProductCard';

interface ProductsGridProps {
  products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-max">
      {products.map((product) => (
        <div key={product._id} className="min-w-[250px]">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
