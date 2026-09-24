import { Routes } from '@angular/router';

import { FlightDashboard } from './components/flight-dashboard/flight-dashboard';

export const routes: Routes = [
    { path: 'dashboard', component: FlightDashboard },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' },
];