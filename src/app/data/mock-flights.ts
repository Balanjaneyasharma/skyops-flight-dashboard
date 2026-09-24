import { FlightStatus } from '../models/flight-status.model';
import { Flight } from '../models/flight.model';

export const MOCK_FLIGHTS: Flight[] = [
    {
        id: '1', flightNumber: 'AA101', callsign: 'AAL101', aircraftType: 'B737-800',
        origin: { code: 'JFK', name: 'John F. Kennedy Intl', lat: 40.6413, lng: -73.7781 },
        destination: { code: 'LAX', name: 'Los Angeles Intl', lat: 33.9416, lng: -118.4085 },
        status: FlightStatus.Scheduled, estimatedDeparture: '2026-09-23T08:00:00Z', estimatedArrival: '2026-09-23T14:30:00Z',
        currentPosition: { lat: 39.5, lng: -95.0 }
    },
    

    {
        id: '2', flightNumber: 'DL202', callsign: 'DAL202', aircraftType: 'A321neo',
        origin: { code: 'ATL', name: 'Hartsfield-Jackson Atlanta Intl', lat: 33.6407, lng: -84.4277 },
        destination: { code: 'ORD', name: "O'Hare Intl", lat: 41.9742, lng: -87.9073 },
        status: FlightStatus.Delayed, estimatedDeparture: '2026-09-23T09:15:00Z', estimatedArrival: '2026-09-23T10:45:00Z',
        currentPosition: { lat: 33.6407, lng: -84.4277 }
    },

    {
        id: '3', flightNumber: 'UA303', callsign: 'UAL303', aircraftType: 'B777-300ER',
        origin: { code: 'ORD', name: "O'Hare Intl", lat: 41.9742, lng: -87.9073 },
        destination: { code: 'LHR', name: 'London Heathrow', lat: 51.4700, lng: -0.4543 },
        status: FlightStatus.Active, estimatedDeparture: '2026-09-23T18:00:00Z', estimatedArrival: '2026-09-24T07:30:00Z',
        currentPosition: { lat: 50.0, lng: -30.0 }
    },

    {
        id: '4', flightNumber: 'BA404', callsign: 'BAW404', aircraftType: 'A380',
        origin: { code: 'LHR', name: 'London Heathrow', lat: 51.4700, lng: -0.4543 },
        destination: { code: 'DXB', name: 'Dubai Intl', lat: 25.2532, lng: 55.3657 },
        status: FlightStatus.Scheduled, estimatedDeparture: '2026-09-23T21:00:00Z', estimatedArrival: '2026-09-24T07:15:00Z',
        currentPosition: { lat: 51.4700, lng: -0.4543 }
    },

    {
        id: '5', flightNumber: 'EK505', callsign: 'UAE505', aircraftType: 'B777-200LR',
        origin: { code: 'DXB', name: 'Dubai Intl', lat: 25.2532, lng: 55.3657 },
        destination: { code: 'SIN', name: 'Singapore Changi', lat: 1.3644, lng: 103.9915 },
        status: FlightStatus.Arrived, estimatedDeparture: '2026-09-22T22:00:00Z', estimatedArrival: '2026-09-23T09:20:00Z',
        currentPosition: { lat: 1.3644, lng: 103.9915 }
    },

    {
        id: '6', flightNumber: 'SQ606', callsign: 'SIA606', aircraftType: 'A350-900',
        origin: { code: 'SIN', name: 'Singapore Changi', lat: 1.3644, lng: 103.9915 },
        destination: { code: 'HND', name: 'Tokyo Haneda', lat: 35.5494, lng: 139.7798 },
        status: FlightStatus.Active, estimatedDeparture: '2026-09-23T10:00:00Z', estimatedArrival: '2026-09-23T17:45:00Z',
        currentPosition: { lat: 15.0, lng: 118.0 }
    },

    {
        id: '7', flightNumber: 'NH707', callsign: 'ANA707', aircraftType: 'B787-9',
        origin: { code: 'HND', name: 'Tokyo Haneda', lat: 35.5494, lng: 139.7798 },
        destination: { code: 'SYD', name: 'Sydney Kingsford Smith', lat: -33.9399, lng: 151.1753 },
        status: FlightStatus.Delayed, estimatedDeparture: '2026-09-23T12:00:00Z', estimatedArrival: '2026-09-23T22:30:00Z',
        currentPosition: { lat: 35.5494, lng: 139.7798 }
    },

    {
        id: '8', flightNumber: 'QF808', callsign: 'QFA808', aircraftType: 'A330-300',
        origin: { code: 'SYD', name: 'Sydney Kingsford Smith', lat: -33.9399, lng: 151.1753 },
        destination: { code: 'SIN', name: 'Singapore Changi', lat: 1.3644, lng: 103.9915 },
        status: FlightStatus.Scheduled, estimatedDeparture: '2026-09-23T23:00:00Z', estimatedArrival: '2026-09-24T04:30:00Z',
        currentPosition: { lat: -33.9399, lng: 151.1753 }
    },

    {
        id: '9', flightNumber: 'LH909', callsign: 'DLH909', aircraftType: 'A340-600',
        origin: { code: 'FRA', name: 'Frankfurt am Main', lat: 50.0379, lng: 8.5622 },
        destination: { code: 'JFK', name: 'John F. Kennedy Intl', lat: 40.6413, lng: -73.7781 },
        status: FlightStatus.Active, estimatedDeparture: '2026-09-23T11:30:00Z', estimatedArrival: '2026-09-23T14:15:00Z',
        currentPosition: { lat: 48.0, lng: -20.0 }
    },

    {
        id: '10', flightNumber: 'AF010', callsign: 'AFR010', aircraftType: 'B777-300',
        origin: { code: 'CDG', name: 'Paris Charles de Gaulle', lat: 49.0097, lng: 2.5479 },
        destination: { code: 'JFK', name: 'John F. Kennedy Intl', lat: 40.6413, lng: -73.7781 },
        status: FlightStatus.Arrived, estimatedDeparture: '2026-09-22T20:00:00Z', estimatedArrival: '2026-09-23T00:15:00Z',
        currentPosition: { lat: 40.6413, lng: -73.7781 }
    },

    {
        id: '11', flightNumber: 'EY011', callsign: 'ETD011', aircraftType: 'A350-1000',
        origin: { code: 'AUH', name: 'Abu Dhabi Intl', lat: 24.4330, lng: 54.6511 },
        destination: { code: 'JFK', name: 'John F. Kennedy Intl', lat: 40.6413, lng: -73.7781 },
        status: FlightStatus.Delayed, estimatedDeparture: '2026-09-23T02:00:00Z', estimatedArrival: '2026-09-23T09:00:00Z',
        currentPosition: { lat: 24.4330, lng: 54.6511 }
    },

    {
        id: '12', flightNumber: 'CX012', callsign: 'CPA012', aircraftType: 'B747-8F',
        origin: { code: 'HKG', name: 'Hong Kong Intl', lat: 22.3080, lng: 113.9185 },
        destination: { code: 'LAX', name: 'Los Angeles Intl', lat: 33.9416, lng: -118.4085 },
        status: FlightStatus.Active, estimatedDeparture: '2026-09-23T01:00:00Z', estimatedArrival: '2026-09-23T20:00:00Z',
        currentPosition: { lat: 30.0, lng: 170.0 }
    },

    {
        id: '13', flightNumber: 'AI013', callsign: 'AIC013', aircraftType: 'B787-8',
        origin: { code: 'DEL', name: 'Indira Gandhi Intl', lat: 28.5562, lng: 77.1000 },
        destination: { code: 'LHR', name: 'London Heathrow', lat: 51.4700, lng: -0.4543 },
        status: FlightStatus.Scheduled, estimatedDeparture: '2026-09-24T02:30:00Z', estimatedArrival: '2026-09-24T08:00:00Z',
        currentPosition: { lat: 28.5562, lng: 77.1000 }
    },

    {
        id: '14', flightNumber: '6E014', callsign: 'IGO014', aircraftType: 'A320neo',
        origin: { code: 'HYD', name: 'Rajiv Gandhi Intl', lat: 17.2403, lng: 78.4294 },
        destination: { code: 'DEL', name: 'Indira Gandhi Intl', lat: 28.5562, lng: 77.1000 },
        status: FlightStatus.Active, estimatedDeparture: '2026-09-23T13:00:00Z', estimatedArrival: '2026-09-23T15:10:00Z',
        currentPosition: { lat: 21.0, lng: 78.0 }
    },

    {
        id: '15', flightNumber: 'SQ015', callsign: 'SIA015', aircraftType: 'A350-900',
        origin: { code: 'SIN', name: 'Singapore Changi', lat: 1.3644, lng: 103.9915 },
        destination: { code: 'FRA', name: 'Frankfurt am Main', lat: 50.0379, lng: 8.5622 },
        status: FlightStatus.Arrived, estimatedDeparture: '2026-09-22T21:00:00Z', estimatedArrival: '2026-09-23T05:30:00Z',
        currentPosition: { lat: 50.0379, lng: 8.5622 }
    },

    {
        id: '16', flightNumber: 'TK016', callsign: 'THY016', aircraftType: 'A330-200',
        origin: { code: 'IST', name: 'Istanbul Airport', lat: 41.2753, lng: 28.7519 },
        destination: { code: 'DXB', name: 'Dubai Intl', lat: 25.2532, lng: 55.3657 },
        status: FlightStatus.Delayed, estimatedDeparture: '2026-09-23T07:00:00Z', estimatedArrival: '2026-09-23T12:20:00Z',
        currentPosition: { lat: 41.2753, lng: 28.7519 }
    },

    {
        id: '17', flightNumber: 'QR017', callsign: 'QTR017', aircraftType: 'B777-300ER',
        origin: { code: 'DOH', name: 'Hamad Intl', lat: 25.2731, lng: 51.6081 },
        destination: { code: 'ORD', name: "O'Hare Intl", lat: 41.9742, lng: -87.9073 },
        status: FlightStatus.Scheduled, estimatedDeparture: '2026-09-24T04:00:00Z', estimatedArrival: '2026-09-24T13:30:00Z',
        currentPosition: { lat: 25.2731, lng: 51.6081 }
    },

    {
        id: '18', flightNumber: 'CA018', callsign: 'CCA018', aircraftType: 'B747-8',
        origin: { code: 'PEK', name: 'Beijing Capital Intl', lat: 40.0801, lng: 116.5846 },
        destination: { code: 'LAX', name: 'Los Angeles Intl', lat: 33.9416, lng: -118.4085 },
        status: FlightStatus.Active, estimatedDeparture: '2026-09-23T04:00:00Z', estimatedArrival: '2026-09-23T20:30:00Z',
        currentPosition: { lat: 45.0, lng: -160.0 }
    },
];