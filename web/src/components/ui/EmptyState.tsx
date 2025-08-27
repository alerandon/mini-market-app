interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  showCard?: boolean;
}

export default function EmptyState({
  icon = '🔍',
  title,
  description,
  actionText,
  onAction,
  showCard = true,
}: EmptyStateProps) {
  const EmptyContent = () => (
    <div className="text-center">
      <div className="text-6xl mb-6">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      {onAction && actionText && (
        <button
          onClick={onAction}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          {actionText}
        </button>
      )}
    </div>
  );

  if (!showCard) {
    return <EmptyContent />;
  }

  return (
    <div className="text-center py-16">
      <div className="bg-white p-12 rounded-lg shadow-lg max-w-md mx-auto">
        <EmptyContent />
      </div>
    </div>
  );
}
