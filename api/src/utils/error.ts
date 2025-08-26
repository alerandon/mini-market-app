export function handleErrorResponse(error: unknown) {
  const errorMessage =
    error instanceof Error ? error.message : 'Error desconocido';

  return {
    success: false,
    message: 'Error interno del servidor',
    error: errorMessage,
  };
}
