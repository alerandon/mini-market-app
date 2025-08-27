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
        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        ← Volver a productos
      </button>
    </div>
  );
}
