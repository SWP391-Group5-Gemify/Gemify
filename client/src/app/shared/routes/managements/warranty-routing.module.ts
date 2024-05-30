import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarrantyComponent } from '../../components/managements/warranty/warranty.component';
import { authGuard } from '../../../core/guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: WarrantyComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarrantyRoutingModule {}
