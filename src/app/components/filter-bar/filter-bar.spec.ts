import { ComponentFixture, TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { FlightService } from '../../services/flight';
import { FilterBarComponent } from './filter-bar';

describe('FilterBarComponent', () => {
  let fixture: ComponentFixture<FilterBarComponent>;
  let flightService: FlightService;

  beforeEach(async () => {
    jest.useFakeTimers();
    await TestBed.configureTestingModule({ imports: [FilterBarComponent] }).compileComponents();
    fixture = TestBed.createComponent(FilterBarComponent);
    flightService = TestBed.inject(FlightService);
    fixture.detectChanges();
  });

  afterEach(() => jest.useRealTimers());

  it('renders all filter controls', () => {
    expect(fixture.nativeElement.querySelectorAll('select')).toHaveLength(3);
    expect(fixture.nativeElement.querySelector('input')).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Flight explorer');
  });

  it('publishes a debounced callsign filter to the service', async () => {
    fixture.componentInstance.filterForm.controls.callsignSearch.setValue('AAL101');
    jest.advanceTimersByTime(250);

    const filters = await firstValueFrom(flightService.filters$);
    expect(filters.search).toBe('AAL101');
  });

  it('publishes status and airport filter changes together', async () => {
    const controls = fixture.componentInstance.filterForm.controls;
    controls.status.setValue('Active');
    controls.originCode.setValue('ORD');
    controls.destinationCode.setValue('LHR');
    jest.advanceTimersByTime(250);

    const filters = await firstValueFrom(flightService.filters$);
    expect(filters).toEqual({ search: '', status: 'Active', origin: 'ORD', destination: 'LHR' });
  });
});