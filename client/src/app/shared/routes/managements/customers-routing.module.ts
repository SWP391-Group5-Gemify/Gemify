import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from '../../components/managements/customers/customers.component';
import { authGuard } from '../../../core/guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
