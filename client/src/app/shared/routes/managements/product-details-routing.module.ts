import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsManagementComponent } from '../../components/managements/products-management/product-details-management/product-details-management.component';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailsRoutingModule {}
