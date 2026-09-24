# SkyOps — Flight Tracking & Operations Dashboard

A responsive flight operations dashboard built with Angular 20 and Leaflet, for monitoring live flight
status, routes, and key operational metrics from a single screen.

**Live demo:** https://github.com/Balanjaneyasharma/skyops-flight-dashboard

---

## Features

- **Interactive Leaflet map** plotting 18 mock flights, each with flight number, callsign, origin,
  destination, and status
- **Route visualization** — selecting a flight highlights its route with a polyline and centers/zooms
  the map to fit it
- **Flight details panel** — aircraft type, origin, destination, status, estimated departure/arrival
- **KPI dashboard** — live counts for Total, Active, Delayed, Arrived, and Scheduled flights
- **Search & filters** — search by callsign, filter by status, origin, and destination airport, with a
  one-click reset
- **Marker clustering** at low zoom levels to keep the map legible when flights overlap
- **Airport markers** layer, toggleable
- **Route playback** — animate a selected flight's position along its route
- **Dark mode**
- Fully responsive layout (desktop and tablet)

## Tech stack

- Angular 20 (standalone components, signals, new control-flow syntax)
- TypeScript
- RxJS (state management via a central `FlightService`)
- Leaflet for mapping
- Reactive Forms for search/filtering
- Angular Router

## Getting started

**Prerequisites:** Node.js 18+, npm

```bash
git clone https://github.com/Balanjaneyasharma/skyops-flight-dashboard.git
cd skypos-flight-dashboard
npm install
ng serve
```

Open `http://localhost:4200`. The app redirects to `/dashboard` by default.

### Running tests

```bash
ng test
```

### Production build

```bash
ng build
```

Build artifacts are output to `dist/`.

---

## Design & architecture notes

### State management

All flight data, filters, and selection state live in a single `FlightService`, built around RxJS
streams (`BehaviorSubject` + `combineLatest`). Components never read or filter the mock data directly —
they subscribe to derived observables (`filteredFlights$`, `kpiSummary$`, `selectedFlight$`) and convert
them to signals at the component boundary with `toSignal()`. This keeps the "single source of truth"
pattern intact: RxJS composes and derives state centrally, signals drive template rendering locally.
One notable rule enforced in the service: if a filter change removes the currently selected flight from
view, the selection is automatically cleared, so the map and details panel never point at a flight
that's no longer visible.

### Component structure

`DashboardComponent` is a pure layout shell — it has no injected state of its own and simply arranges
four independent, self-contained components (`FlightMapComponent`, `KpiCardsComponent`,
`FilterBarComponent`, `FlightDetailsPanelComponent`), each of which injects `FlightService` directly.
This keeps every child component reusable and testable in isolation, and means the dashboard's layout
can change without touching any component's internal logic.

### Status modeling

Flight status is a TypeScript `enum` (`FlightStatus`), never a raw string, so every comparison across
the codebase is typo-proof and autocompletable. Display concerns (label text, badge color) are kept
separate from the enum itself, in a `Record<FlightStatus, FlightStatusDisplayConfig>` map — this means
adding a new status only requires touching one file, and TypeScript will flag any place that doesn't
handle it.

### Forms

The filter bar uses a directly-constructed, fully-typed `FormGroup` (not `FormBuilder`), so filter
values are type-checked at compile time rather than inferred loosely.

### Map behavior

Markers are grouped into clusters at low zoom levels to avoid visual overlap on a world view, and split
back into individual markers as the user zooms in. Route playback interpolates a flight's position
linearly between origin and destination coordinates over time.

---

## Known limitations

- Flight data is static mock data — no live backend or WebSocket feed
- Route playback uses linear interpolation between two points rather than real flight-path curvature
- Weather overlay is illustrative/mock, not a live weather data source

## Screenshots
### Light Mode
<img width="1919" height="908" alt="image" src="https://github.com/user-attachments/assets/b7cfc6c5-4ab8-44bc-ad61-a07cb65cb33b" />

### Dark Mode
<img width="1915" height="903" alt="image" src="https://github.com/user-attachments/assets/32b763ec-867d-47e5-824c-8c49ab81af32" />

