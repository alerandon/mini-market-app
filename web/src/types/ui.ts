// Tamaños comunes para componentes UI
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Variantes de color
export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

// Props comunes para componentes UI
export interface BaseUIProps {
  className?: string;
  children?: React.ReactNode;
}

// Props para componentes con loading
export interface LoadableProps {
  loading?: boolean;
  disabled?: boolean;
}

// Props para componentes con acciones
export interface ActionableProps {
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

// Características de layout
export interface Feature {
  icon: string;
  title: string;
  description: string;
}
