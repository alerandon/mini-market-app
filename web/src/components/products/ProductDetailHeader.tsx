import { ChevronLeftIcon } from '../ui';

interface ProductDetailHeaderProps {
  onGoBack: () => void;
}

export default function ProductDetailHeader({
  onGoBack,
}: ProductDetailHeaderProps) {
  return (
    <div className="mb-8">
      <button
        onClick={onGoBack}
        className="cursor-pointer inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
      >
        <ChevronLeftIcon className="mr-2" />
        Volver a productos
      </button>
    </div>
  );
}
