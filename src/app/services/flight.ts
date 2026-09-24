import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

import { Flight, FlightKpiSummary } from '../models/flight.model';
import { MOCK_FLIGHTS } from '../data/mock-flights';
import { FlightFilters } from '../models/flight-filters.model';
import { FlightStatus } from '../models/flight-status.model';

@Injectable({ providedIn: 'root' })
export class FlightService {

    private readonly flightsSubject = new BehaviorSubject<Flight[]>(MOCK_FLIGHTS);
    private readonly selectedFlightSubject = new BehaviorSubject<Flight | null>(null);
    private readonly filtersSubject = new BehaviorSubject<FlightFilters>({
        search: '', status: null, origin: null, destination: null,
    });

    readonly flights$ = this.flightsSubject.asObservable();
    readonly selectedFlight$ = this.selectedFlightSubject.asObservable();
    readonly filters$ = this.filtersSubject.asObservable();

    readonly filteredFlights$: Observable<Flight[]> = combineLatest([this.flights$, this.filters$]).pipe(
        map(([flights, filters]) => flights.filter(flight =>
            (!filters.search || flight.callsign.toLowerCase().includes(filters.search.toLowerCase())) &&
            (!filters.status || flight.status === filters.status) &&
            (!filters.origin || flight.origin.code === filters.origin) &&
            (!filters.destination || flight.destination.code === filters.destination)
        ))
    );

    readonly kpiSummary$: Observable<FlightKpiSummary> = this.flights$.pipe(
        map(flights => {
            const flightCountByStatus = flights.reduce((countsByStatus, flight) => {
                countsByStatus[flight.status] = (countsByStatus[flight.status] ?? 0) + 1;
                return countsByStatus;
            }, {} as Record<FlightStatus, number>);

            return {
                total: flights.length,
                active: flightCountByStatus[FlightStatus.Active] ?? 0,
                delayed: flightCountByStatus[FlightStatus.Delayed] ?? 0,
                arrived: flightCountByStatus[FlightStatus.Arrived] ?? 0,
                scheduled: flightCountByStatus[FlightStatus.Scheduled] ?? 0,
            };
        })
    );

    readonly originAirportCodes$: Observable<string[]> = this.flights$.pipe(
        map(flights => [...new Set(flights.map(flight => flight.origin.code))].sort())
    );

    readonly destinationAirportCodes$: Observable<string[]> = this.flights$.pipe(
        map(flights => [...new Set(flights.map(flight => flight.destination.code))].sort())
    );

    selectFlight(flight: Flight): void {
        this.selectedFlightSubject.next(flight);
    }

    updateFilters(partialFilters: Partial<FlightFilters>): void {
        this.filtersSubject.next({ ...this.filtersSubject.value, ...partialFilters });
    }
}