// Re-exportar tipos compartidos de API
export type {
  ApiResponse,
  ApiError,
  LoadingState,
  AsyncResult as AsyncHookResult,
} from '@mini-market/shared';

// Configuración de la API (específico del cliente web)
export interface ApiConfig {
  baseUrl: string;
  timeout?: number;
  headers?: Record<string, string>;
}
