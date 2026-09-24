import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiCardsComponent } from './kpi-cards';

describe('KpiCardsComponent', () => {
  let fixture: ComponentFixture<KpiCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [KpiCardsComponent] }).compileComponents();
    fixture = TestBed.createComponent(KpiCardsComponent);
    fixture.detectChanges();
  });

  it('renders the five operational KPI cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.kpi-card');

    expect(cards).toHaveLength(5);
    expect(fixture.nativeElement.textContent).toContain('Total Flights');
    expect(fixture.nativeElement.textContent).toContain('Active Flights');
    expect(fixture.nativeElement.textContent).toContain('Delayed Flights');
    expect(fixture.nativeElement.textContent).toContain('Arrived Flights');
    expect(fixture.nativeElement.textContent).toContain('Scheduled Flights');
  });

  it('maps the service summary into the KPI view model', () => {
    expect(fixture.componentInstance.kpiCards()).toEqual([
      { label: 'Total Flights', value: 18 },
      { label: 'Active Flights', value: 6 },
      { label: 'Delayed Flights', value: 4 },
      { label: 'Arrived Flights', value: 3 },
      { label: 'Scheduled Flights', value: 5 },
    ]);
  });
});