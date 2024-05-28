import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GoldChartComponent } from './gold-chart/gold-chart.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'prefix' },
  { path: 'gold-chart', component: GoldChartComponent, pathMatch: 'prefix' },
  // { path: '**', component:}
];
