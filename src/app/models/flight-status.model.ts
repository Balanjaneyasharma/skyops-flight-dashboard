export enum FlightStatus {
  Scheduled = 'Scheduled',
  Active = 'Active',
  Delayed = 'Delayed',
  Arrived = 'Arrived',
  Cancelled = 'Cancelled',
}

export interface FlightStatusDisplayConfig {
  label: string;
  colorVar: string; // CSS custom property name, e.g. '--status-active'
}

// Record<FlightStatus, ...> means TypeScript forces you to add an entry
// here the moment you add a new enum member — nothing can be forgotten silently.
export const FLIGHT_STATUS_DISPLAY: Record<FlightStatus, FlightStatusDisplayConfig> = {
  [FlightStatus.Scheduled]: { label: 'Scheduled', colorVar: '--status-scheduled' },
  [FlightStatus.Active]:    { label: 'Active',    colorVar: '--status-active' },
  [FlightStatus.Delayed]:   { label: 'Delayed',   colorVar: '--status-delayed' },
  [FlightStatus.Arrived]:   { label: 'Arrived',   colorVar: '--status-arrived' },
  [FlightStatus.Cancelled]: { label: 'Cancelled', colorVar: '--status-cancelled' },
};