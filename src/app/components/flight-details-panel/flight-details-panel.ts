import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { FlightService } from '../../services/flight';
import { FlightStatusBadgeComponent } from '../../shared/components/flight-status-badge/flight-status-badge';

@Component({
  selector: 'app-flight-details-panel',
  standalone: true,
  imports: [CommonModule, FlightStatusBadgeComponent],
  templateUrl: './flight-details-panel.html',
  styleUrls: ['./flight-details-panel.scss'],
})
export class FlightDetailsPanelComponent {

  private readonly flightService = inject(FlightService);
  readonly selectedFlight = toSignal(this.flightService.selectedFlight$, { initialValue: null });
}