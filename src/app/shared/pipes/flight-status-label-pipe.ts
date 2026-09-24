import { Pipe, PipeTransform } from '@angular/core';
import { FlightStatus, FLIGHT_STATUS_DISPLAY } from '../../models/flight-status.model';

@Pipe({ name: 'flightStatusLabel', standalone: true })
export class FlightStatusLabelPipe implements PipeTransform {
  
  transform(status: FlightStatus): string {
    return FLIGHT_STATUS_DISPLAY[status].label;
  }
}