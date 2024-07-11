import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountersComponent } from '../../components/managements/counters/counters.component';

const routes: Routes = [
  {
    path: '',
    component: CountersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountersRoutingModule {}
