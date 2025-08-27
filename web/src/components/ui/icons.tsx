import { Icon, IconProps } from './Icon';

// Icono de flecha hacia la izquierda (back/previous)
export function ChevronLeftIcon({
  size = 20,
  className = '',
  ...props
}: IconProps) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="M15 19l-7-7 7-7" />
    </Icon>
  );
}

// Icono de búsqueda/lupa
export function SearchIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <Icon size={size} className={className} {...props}>
      <circle cx="9" cy="9" r="7" />
      <line x1="15" y1="15" x2="21" y2="21" />
    </Icon>
  );
}

// Icono de X/cerrar
export function XIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
    </Icon>
  );
}

// Icono de flecha hacia la derecha
export function ChevronRightIcon({
  size = 20,
  className = '',
  ...props
}: IconProps) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="M9 5l7 7-7 7" />
    </Icon>
  );
}

// Icono de home/casa
export function HomeIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <Icon size={size} className={className} {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </Icon>
  );
}

// Icono de carrito de compras
export function ShoppingCartIcon({
  size = 20,
  className = '',
  ...props
}: IconProps) {
  return (
    <Icon size={size} className={className} {...props}>
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12" />
    </Icon>
  );
}

// Icono de filtro
export function FilterIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <Icon size={size} className={className} {...props}>
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
    </Icon>
  );
}

// Icono de carga/loading (spinner)
export function LoadingIcon({
  size = 20,
  className = '',
  ...props
}: IconProps) {
  return (
    <Icon size={size} className={`animate-spin ${className}`} {...props}>
      <path d="M21 12a9 9 0 11-6.219-8.56" />
    </Icon>
  );
}
