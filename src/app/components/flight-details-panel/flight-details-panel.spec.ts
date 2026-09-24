import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MOCK_FLIGHTS } from '../../data/mock-flights';
import { FlightService } from '../../services/flight';
import { FlightDetailsPanelComponent } from './flight-details-panel';

describe('FlightDetailsPanelComponent', () => {
  let fixture: ComponentFixture<FlightDetailsPanelComponent>;
  let flightService: FlightService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FlightDetailsPanelComponent] }).compileComponents();
    fixture = TestBed.createComponent(FlightDetailsPanelComponent);
    flightService = TestBed.inject(FlightService);
    fixture.detectChanges();
  });

  it('shows the empty state until a flight is selected', () => {
    expect(fixture.nativeElement.textContent).toContain('Select a flight on the map');
  });

  it('shows the selected flight operational details', () => {
    flightService.selectFlight(MOCK_FLIGHTS[0]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('AA101');
    expect(fixture.nativeElement.textContent).toContain('B737-800');
    expect(fixture.nativeElement.textContent).toContain('JFK');
    expect(fixture.nativeElement.textContent).toContain('LAX');
  });

  it('updates its selected flight signal when the service selection changes', () => {
    const selectedFlight = MOCK_FLIGHTS[2];

    flightService.selectFlight(selectedFlight);

    expect(fixture.componentInstance.selectedFlight()).toEqual(selectedFlight);
  });
});