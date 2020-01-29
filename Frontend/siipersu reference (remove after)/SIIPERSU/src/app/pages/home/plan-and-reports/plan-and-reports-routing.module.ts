import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanAndReportsPage } from './plan-and-reports.page';

const routes: Routes = [
  {
    path: '',
    component: PlanAndReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanAndReportsPageRoutingModule {}
