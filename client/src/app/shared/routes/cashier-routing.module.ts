import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../core/guard/auth/auth.guard';
import { CashierComponent } from '../components/dashboards/cashier/cashier.component';

const routes: Routes = [
  {
    path: '',
    component: CashierComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashierRoutingModule {}
