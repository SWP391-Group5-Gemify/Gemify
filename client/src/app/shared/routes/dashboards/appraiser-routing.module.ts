import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppraiserComponent } from '../../components/dashboards/appraiser/appraiser.component';

const routes: Routes = [
  {
    path: '',
    component: AppraiserComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppraiserRoutingModule {}
