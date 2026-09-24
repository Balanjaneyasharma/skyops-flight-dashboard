import { FlightStatus } from '../../models/flight-status.model';
import { FlightStatusLabelPipe } from './flight-status-label-pipe';

describe('FlightStatusLabelPipe', () => {
  it('returns the display label for each flight status', () => {
    const pipe = new FlightStatusLabelPipe();

    expect(pipe.transform(FlightStatus.Active)).toBe('Active');
    expect(pipe.transform(FlightStatus.Delayed)).toBe('Delayed');
    expect(pipe.transform(FlightStatus.Cancelled)).toBe('Cancelled');
  });
});