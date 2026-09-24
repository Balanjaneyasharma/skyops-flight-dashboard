import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDashboard } from './flight-dashboard';

describe('FlightDashboard', () => {
  let fixture: ComponentFixture<FlightDashboard>;
  let document: Document;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FlightDashboard] })
      .overrideComponent(FlightDashboard, { set: { template: '<button (click)="toggleDarkMode()">Theme</button>' } })
      .compileComponents();

    fixture = TestBed.createComponent(FlightDashboard);
    document = TestBed.inject(DOCUMENT);
    fixture.detectChanges();
  });

  afterEach(() => {
    document.documentElement.classList.remove('dark-mode');
    document.documentElement.style.colorScheme = '';
  });

  it('toggles the document-wide dark theme', () => {
    expect(document.documentElement.classList.contains('dark-mode')).toBe(false);

    fixture.componentInstance.toggleDarkMode();
    fixture.detectChanges();

    expect(document.documentElement.classList.contains('dark-mode')).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe('dark');
  });
});