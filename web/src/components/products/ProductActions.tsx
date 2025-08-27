interface ProductActionsProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isAvailable: boolean;
}

export default function ProductActions({
  isFavorite,
  onToggleFavorite,
  isAvailable,
}: ProductActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-6">
      <button
        onClick={onToggleFavorite}
        className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg ${
          isFavorite
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {isFavorite ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
      </button>

      <button
        disabled={!isAvailable}
        className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg ${
          isAvailable
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-400 text-gray-600 cursor-not-allowed'
        }`}
      >
        {isAvailable ? '🛒 Agregar al carrito' : '❌ No disponible'}
      </button>
    </div>
  );
}
