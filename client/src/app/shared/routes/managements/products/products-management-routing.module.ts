import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsManagementComponent } from '../../../components/managements/products-management/products-management.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsManagementComponent,
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./product-details-routing.module').then(
        (m) => m.ProductDetailsRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsManagementRoutingModule {}
