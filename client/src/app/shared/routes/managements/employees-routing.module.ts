import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from '../../components/managements/employees/employees.component';
import { authGuard } from '../../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
