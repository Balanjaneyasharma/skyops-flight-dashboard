import { DOCUMENT } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { FlightMapComponent } from '../flight-map/flight-map';
import { KpiCardsComponent } from '../kpi-cards/kpi-cards';
import { FilterBarComponent } from '../filter-bar/filter-bar';
import { FlightDetailsPanelComponent } from '../flight-details-panel/flight-details-panel';
import { FlightService } from '../../services/flight';

@Component({
  selector: 'app-flight-dashboard',
  standalone: true,
  imports: [
    FlightMapComponent, 
    KpiCardsComponent, 
    FilterBarComponent, 
    FlightDetailsPanelComponent
  ],
  templateUrl: './flight-dashboard.html',
  styleUrls: ['./flight-dashboard.scss'],
})
export class FlightDashboard {
  private readonly document = inject(DOCUMENT);
  private readonly flightService = inject(FlightService);
  readonly trackedFlights = toSignal(this.flightService.filteredFlights$, { initialValue: [] });
  readonly darkMode = signal(false);

  constructor() {
    effect(() => {
      const isDark = this.darkMode();
      this.document.documentElement.classList.toggle('dark-mode', isDark);
      this.document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    });
  }

  toggleDarkMode(): void {
    this.darkMode.update(isDark => !isDark);
  }
}