import { BaseUIProps } from '@/types';

interface ContentCardProps extends BaseUIProps {
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function ContentCard({
  children,
  className = '',
  padding = 'md',
  shadow = 'lg',
  rounded = 'lg',
}: ContentCardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const roundedClasses = {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };

  return (
    <div
      className={`bg-white ${paddingClasses[padding]} ${shadowClasses[shadow]} ${roundedClasses[rounded]} overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
