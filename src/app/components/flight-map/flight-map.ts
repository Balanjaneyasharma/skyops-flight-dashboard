import { Component, OnDestroy, OnInit, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import * as L from 'leaflet';

import { Flight } from '../../models/flight.model';
import { FlightService } from '../../services/flight';
import { FLIGHT_STATUS_DISPLAY } from '../../models/flight-status.model';

@Component({
    selector: 'app-flight-map',
    imports: [],
    templateUrl: './flight-map.html',
    styleUrl: './flight-map.scss',
})
export class FlightMapComponent implements OnInit, OnDestroy {

    private readonly flightService = inject(FlightService);
    private map!: L.Map;
    private markers = new Map<string, L.Marker>();
    private flightLayer = L.layerGroup();
    private airportLayer = L.layerGroup();
    private weatherLayer = L.layerGroup();
    private routeLine?: L.Polyline;
    private playbackTimer?: ReturnType<typeof setInterval>;

    readonly flights = toSignal(this.flightService.filteredFlights$, { initialValue: [] });
    readonly selectedFlight = toSignal(this.flightService.selectedFlight$, { initialValue: null });
    readonly playbackProgress = signal(0);
    readonly playbackPercent = computed(() => Math.round(this.playbackProgress() * 100));
    readonly isPlaying = signal(false);
    readonly showAirports = signal(true);
    readonly showWeather = signal(false);

    constructor() {
        effect(() => this.plotFlights(this.flights()));
        effect(() => {
            const f = this.selectedFlight();
            if (f) this.focusFlight(f);
        });
    }

    ngOnInit() {
        this.initMap();
    }

    ngOnDestroy(): void {
        this.stopPlayback();
        this.map?.remove();
    }

    private initMap() {
        this.map = L.map('flight-map').setView([20, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
        this.flightLayer.addTo(this.map);
        this.airportLayer.addTo(this.map);
        this.map.on('zoomend', () => this.plotFlights(this.flights()));
        this.updateAirportLayer(this.flights());
        this.plotFlights(this.flights());

        setTimeout(() => this.map.invalidateSize(), 0);
    }

    private plotFlights(flights: Flight[]) {
        if (!this.map) return;
        this.flightLayer.clearLayers();
        this.markers.clear();
        const shouldCluster = this.map.getZoom() <= 2;
        const groups = new Map<string, Flight[]>();

        flights.forEach(flight => {
            const position = this.getFlightPosition(flight);
            const key = shouldCluster
                ? `${Math.round(position.lat / 8)}:${Math.round(position.lng / 8)}`
                : flight.id;
            groups.set(key, [...(groups.get(key) ?? []), flight]);
        });

        groups.forEach(group => {
            const position = this.getFlightPosition(group[0]);
            if (group.length > 1) {
                L.marker([position.lat, position.lng], {
                    icon: L.divIcon({
                        className: 'flight-cluster',
                        html: `<span>${group.length}</span>`,
                        iconSize: [34, 34],
                        iconAnchor: [17, 17],
                    }),
                }).bindTooltip(`${group.length} flights in this area`).addTo(this.flightLayer);
                return;
            }

            const flight = group[0];
            const marker = L.marker([position.lat, position.lng], {
                title: `${flight.flightNumber} ${flight.callsign}`,
            })
                .bindPopup(`<b>${flight.flightNumber}</b><br>${flight.callsign}<br>${flight.origin.code} → ${flight.destination.code}<br>${FLIGHT_STATUS_DISPLAY[flight.status].label}`)
                .on('click', () => this.flightService.selectFlight(flight));
            marker.addTo(this.flightLayer);
            this.markers.set(flight.id, marker);
        });
    }

    private getFlightPosition(flight: Flight): { lat: number; lng: number } {
        if (!this.isPlaying() && this.playbackProgress() === 0 && flight.currentPosition) {
            return flight.currentPosition;
        }
        const progress = this.playbackProgress();
        return {
            lat: flight.origin.lat + (flight.destination.lat - flight.origin.lat) * progress,
            lng: flight.origin.lng + (flight.destination.lng - flight.origin.lng) * progress,
        };
    }

    private updateAirportLayer(flights: Flight[]): void {
        const airports = new Map<string, Flight['origin']>();
        flights.forEach(flight => {
            airports.set(flight.origin.code, flight.origin);
            airports.set(flight.destination.code, flight.destination);
        });
        this.airportLayer.clearLayers();
        airports.forEach(airport => {
            L.circleMarker([airport.lat, airport.lng], {
                radius: 4,
                color: '#f5b544',
                weight: 2,
                fillColor: '#102d3a',
                fillOpacity: 1,
            }).bindTooltip(`${airport.code} · ${airport.name}`).addTo(this.airportLayer);
        });
    }

    private updateWeatherLayer(): void {
        this.weatherLayer.clearLayers();
        if (!this.showWeather()) return;
        const weatherCells = [
            { lat: 39, lng: -84, label: 'Storm watch · Midwest' },
            { lat: 25, lng: 55, label: 'Visibility watch · Gulf' },
            { lat: 35, lng: 110, label: 'Clear corridor · Asia' },
        ];
        weatherCells.forEach(cell => {
            L.circle([cell.lat, cell.lng], {
                radius: 850000,
                color: '#e18b55',
                fillColor: '#e18b55',
                fillOpacity: 0.13,
                weight: 1,
            }).bindTooltip(cell.label).addTo(this.weatherLayer);
        });
    }

    togglePlayback(): void {
        if (this.isPlaying()) {
            this.stopPlayback();
            return;
        }
        if (this.playbackProgress() >= 1) this.playbackProgress.set(0);
        this.isPlaying.set(true);
        this.playbackTimer = setInterval(() => {
            const nextProgress = this.playbackProgress() + 0.01;
            if (nextProgress >= 1) {
                this.playbackProgress.set(1);
                this.stopPlayback();
                return;
            }
            this.playbackProgress.set(nextProgress);
            this.plotFlights(this.flights());
        }, 140);
    }

    setPlaybackProgress(event: Event): void {
        const value = Number((event.target as HTMLInputElement).value) / 100;
        this.playbackProgress.set(value);
        this.plotFlights(this.flights());
    }

    toggleAirports(): void {
        this.showAirports.update(show => !show);
        if (this.showAirports()) this.airportLayer.addTo(this.map);
        else this.airportLayer.removeFrom(this.map);
    }

    toggleWeather(): void {
        this.showWeather.update(show => !show);
        this.updateWeatherLayer();
        if (this.showWeather()) this.weatherLayer.addTo(this.map);
        else this.weatherLayer.removeFrom(this.map);
    }

    private stopPlayback(): void {
        if (this.playbackTimer) clearInterval(this.playbackTimer);
        this.playbackTimer = undefined;
        this.isPlaying.set(false);
        this.plotFlights(this.flights());
    }

    private focusFlight(flight: Flight) {
        this.routeLine?.remove();
        this.routeLine = L.polyline(
            [[flight.origin.lat, flight.origin.lng], [flight.destination.lat, flight.destination.lng]],
            { color: '#2563eb', weight: 3 }
        ).addTo(this.map);
        this.map.flyToBounds(this.routeLine.getBounds(), { padding: [50, 50] });
    }
}
