// Se cambia enum numérico a string enum.
// Esto evita inconsistencias en base de datos y facilita debugging.
export enum MeetingStatus {
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  PENDING = 'pending',
}