import { FlightStatus } from './flight-status.model';

export interface Airport {
  code: string;
  name: string;
  lat: number;
  lng: number;
}

export interface Flight {
  id: string;
  flightNumber: string;
  callsign: string;
  aircraftType: string;
  origin: Airport;
  destination: Airport;
  status: FlightStatus;
  estimatedDeparture: string;
  estimatedArrival: string;
  currentPosition?: { lat: number; lng: number };
}

export interface FlightKpiSummary {
  total: number;
  active: number;
  delayed: number;
  arrived: number;
  scheduled: number;
}
