import { SVGProps } from 'react';

// Interfaz base para todos los iconos
export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

// Componente base para iconos
export function Icon({
  children,
  size = 24,
  className = '',
  viewBox = '0 0 24 24',
  fill = 'none',
  stroke = 'currentColor',
  strokeWidth = 2,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  ...props
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}
