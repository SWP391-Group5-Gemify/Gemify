import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../../core/guard/auth/auth.guard';
import { CashierComponent } from '../../components/dashboards/cashier/cashier.component';
import { roleGuard } from '../../../core/guard/roles/role.guard';

const routes: Routes = [
  {
    path: '',
    component: CashierComponent,
    canActivate: [authGuard, roleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashierRoutingModule {}
