import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightMapComponent } from './flight-map';

describe('FlightMapComponent', () => {
  let fixture: ComponentFixture<FlightMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FlightMapComponent] })
      .overrideComponent(FlightMapComponent, { set: { template: '<div id="flight-map"></div>' } })
      .compileComponents();

    fixture = TestBed.createComponent(FlightMapComponent);
  });

  afterEach(() => fixture.destroy());

  it('creates the map component with playback and layer controls', () => {
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
    expect(component.playbackProgress()).toBe(0);
    expect(component.showAirports()).toBe(true);
    expect(component.showWeather()).toBe(false);
  });

  it('advances and pauses route playback', () => {
    jest.useFakeTimers();
    const component = fixture.componentInstance;

    component.togglePlayback();
    jest.advanceTimersByTime(420);

    expect(component.isPlaying()).toBe(true);
    expect(component.playbackProgress()).toBeGreaterThan(0);

    component.togglePlayback();
    expect(component.isPlaying()).toBe(false);
    jest.useRealTimers();
  });

  it('updates playback from the range input', () => {
    const component = fixture.componentInstance;

    component.setPlaybackProgress({ target: { value: '65' } } as unknown as Event);

    expect(component.playbackProgress()).toBe(0.65);
    expect(component.playbackPercent()).toBe(65);
  });

  it('toggles weather and airport layers on the map', () => {
    const component = fixture.componentInstance as FlightMapComponent & {
      map: { addLayer: jest.Mock; removeLayer: jest.Mock; getZoom: jest.Mock; remove: jest.Mock };
    };
    component.map = {
      addLayer: jest.fn(),
      removeLayer: jest.fn(),
      getZoom: jest.fn(() => 2),
      remove: jest.fn(),
    };

    component.toggleWeather();
    component.toggleAirports();

    expect(component.showWeather()).toBe(true);
    expect(component.showAirports()).toBe(false);
    expect(component.map.addLayer).toHaveBeenCalled();
    expect(component.map.removeLayer).toHaveBeenCalled();
  });
});