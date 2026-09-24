import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightStatus } from '../../../models/flight-status.model';
import { FlightStatusBadgeComponent } from './flight-status-badge';

describe('FlightStatusBadgeComponent', () => {
  let fixture: ComponentFixture<FlightStatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FlightStatusBadgeComponent] }).compileComponents();
    fixture = TestBed.createComponent(FlightStatusBadgeComponent);
    fixture.componentRef.setInput('status', FlightStatus.Active);
    fixture.detectChanges();
  });

  it('renders the status label and its display color variable', () => {
    const badge = fixture.nativeElement.querySelector('.status-badge');

    expect(badge.textContent.trim()).toBe('Active');
    expect(badge.style.backgroundColor).toBe('var(--status-active)');
  });

  it('computes the CSS color variable from the input status', () => {
    expect(fixture.componentInstance.status()).toBe(FlightStatus.Active);
    expect(fixture.componentInstance.statusColor()).toBe('var(--status-active)');
  });
});