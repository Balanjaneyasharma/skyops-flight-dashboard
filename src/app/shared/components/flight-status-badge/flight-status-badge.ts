import { Component, computed, input } from '@angular/core';

import { FlightStatus, FLIGHT_STATUS_DISPLAY } from '../../../models/flight-status.model';
import { FlightStatusLabelPipe } from '../../pipes/flight-status-label-pipe';

@Component({
  selector: 'app-flight-status-badge',
  standalone: true,
  imports: [FlightStatusLabelPipe],
  template: `
    <span class="status-badge" [style.background-color]="statusColor()">
      {{ status() | flightStatusLabel }}
    </span>
  `,
  styleUrls: ['./flight-status-badge.scss'],
})
export class FlightStatusBadgeComponent {
  
  status = input.required<FlightStatus>();
  statusColor = computed(() => `var(${FLIGHT_STATUS_DISPLAY[this.status()].colorVar})`);
}