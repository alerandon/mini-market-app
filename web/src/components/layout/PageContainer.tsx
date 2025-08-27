import { BaseUIProps } from '@/types';

interface PageContainerProps extends BaseUIProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'sm' | 'md' | 'lg';
  background?: 'white' | 'gray' | 'gradient';
}

export default function PageContainer({
  children,
  className = '',
  maxWidth = 'full',
  padding = 'md',
  background = 'gradient',
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: '',
  };

  const paddingClasses = {
    sm: 'px-4 py-8',
    md: 'px-4 py-16',
    lg: 'px-6 py-20',
  };

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100',
  };

  return (
    <div
      className={`min-h-screen ${backgroundClasses[background]} ${className}`}
    >
      <div
        className={`container mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]}`}
      >
        {children}
      </div>
    </div>
  );
}
