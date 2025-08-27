interface ErrorDisplayProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
  showCard?: boolean;
}

export default function ErrorDisplay({
  title = 'Ups, algo salió mal',
  message,
  onRetry,
  retryText = 'Reintentar',
  showCard = true,
}: ErrorDisplayProps) {
  const ErrorContent = () => (
    <div className="text-center">
      <div className="text-red-500 text-5xl mb-4">⚠️</div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      <p className="text-red-600 mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          {retryText}
        </button>
      )}
    </div>
  );

  if (!showCard) {
    return <ErrorContent />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <ErrorContent />
          </div>
        </div>
      </div>
    </div>
  );
}
