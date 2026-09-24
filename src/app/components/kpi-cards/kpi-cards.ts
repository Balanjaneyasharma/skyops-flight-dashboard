import { Component, computed, inject } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';

import { FlightService } from '../../services/flight';
import { FlightKpiSummary } from '../../models/flight.model';

interface KpiCardDefinition {
  key: keyof FlightKpiSummary;
  label: string;
}

const KPI_CARD_DEFINITIONS: readonly KpiCardDefinition[] = [
  { key: 'total', label: 'Total Flights' },
  { key: 'active', label: 'Active Flights' },
  { key: 'delayed', label: 'Delayed Flights' },
  { key: 'arrived', label: 'Arrived Flights' },
  { key: 'scheduled', label: 'Scheduled Flights' },
];

const EMPTY_KPI_SUMMARY: FlightKpiSummary = { total: 0, active: 0, delayed: 0, arrived: 0, scheduled: 0 };

@Component({
  selector: 'app-kpi-cards',
  standalone: true,
  templateUrl: './kpi-cards.html',
  styleUrls: ['./kpi-cards.scss'],
})
export class KpiCardsComponent {
  private readonly flightService = inject(FlightService);

  // Real counts from FlightService, not hardcoded — EMPTY_KPI_SUMMARY is only
  // a type-safe fallback for the instant before the BehaviorSubject emits.
  private readonly kpiSummary = toSignal(this.flightService.kpiSummary$, {
    initialValue: EMPTY_KPI_SUMMARY,
  });

  readonly kpiCards = computed(() =>
    KPI_CARD_DEFINITIONS.map(definition => ({
      label: definition.label,
      value: this.kpiSummary()[definition.key],
    }))
  );
}