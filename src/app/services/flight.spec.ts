import { firstValueFrom } from 'rxjs';

import { MOCK_FLIGHTS } from '../data/mock-flights';
import { FlightStatus } from '../models/flight-status.model';
import { FlightService } from './flight';

describe('FlightService', () => {
  it('selects a flight and publishes it', async () => {
    const service = new FlightService();

    service.selectFlight(MOCK_FLIGHTS[0]);

    expect(await firstValueFrom(service.selectedFlight$)).toEqual(MOCK_FLIGHTS[0]);
  });

  it('filters flights by callsign and restores the full network when cleared', async () => {
    const service = new FlightService();

    service.updateFilters({ search: 'AAL101' });
    expect((await firstValueFrom(service.filteredFlights$)).map(flight => flight.flightNumber)).toEqual(['AA101']);

    service.updateFilters({ search: '' });
    expect((await firstValueFrom(service.filteredFlights$)).length).toBe(18);
  });

  it('filters by status, origin, and destination together', async () => {
    const service = new FlightService();

    service.updateFilters({
      status: FlightStatus.Active,
      origin: 'ORD',
      destination: 'LHR',
    });

    const flights = await firstValueFrom(service.filteredFlights$);
    expect(flights.map(flight => flight.flightNumber)).toEqual(['UA303']);
  });
});