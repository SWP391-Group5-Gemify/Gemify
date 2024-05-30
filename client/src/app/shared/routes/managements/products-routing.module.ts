import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from '../../components/managements/products/products.component';
import { authGuard } from '../../../core/guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
