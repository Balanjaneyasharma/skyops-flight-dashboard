import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { FlightService } from '../../services/flight';
import { FlightStatus } from '../../models/flight-status.model';

interface FlightFilterFormControls {
  callsignSearch: FormControl<string>;
  status: FormControl<FlightStatus | ''>;
  originCode: FormControl<string>;
  destinationCode: FormControl<string>;
}

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filter-bar.html',
  styleUrls: ['./filter-bar.scss'],
})
export class FilterBarComponent {
  private readonly flightService = inject(FlightService);

  readonly statusOptions = Object.values(FlightStatus)
  readonly originAirportCodes = toSignal(this.flightService.originAirportCodes$, { initialValue: [] as string[] });
  readonly destinationAirportCodes = toSignal(this.flightService.destinationAirportCodes$, { initialValue: [] as string[] });

  readonly filterForm = new FormGroup<FlightFilterFormControls>({
    callsignSearch: new FormControl('', { nonNullable: true }),
    status: new FormControl('', { nonNullable: true }),
    originCode: new FormControl('', { nonNullable: true }),
    destinationCode: new FormControl('', { nonNullable: true }),
  });

  constructor() {
    this.filterForm.valueChanges.pipe(debounceTime(200)).subscribe(formValue => {
      this.flightService.updateFilters({
        search: formValue.callsignSearch ?? '',
        status: formValue.status || null,
        origin: formValue.originCode || null,
        destination: formValue.destinationCode || null,
      });
    });
  }

  resetFilters(): void {
    this.filterForm.reset({
        callsignSearch: '',
        status: '',
        originCode: '',
        destinationCode: '',
    });
}
}