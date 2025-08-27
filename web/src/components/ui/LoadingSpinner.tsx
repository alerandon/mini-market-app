interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  showCard?: boolean;
}

export default function LoadingSpinner({
  message = 'Cargando...',
  size = 'md',
  showCard = true,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  const SpinnerContent = () => (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}
      ></div>
      <p className="mt-4 text-gray-600 text-center">{message}</p>
    </div>
  );

  if (!showCard) {
    return <SpinnerContent />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center min-h-64">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <SpinnerContent />
          </div>
        </div>
      </div>
    </div>
  );
}
