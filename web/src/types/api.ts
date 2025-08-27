// Respuesta base de la API
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Error de la API
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// Configuración de la API
export interface ApiConfig {
  baseUrl: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// Estados de loading
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Hook result pattern
export interface AsyncHookResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}
