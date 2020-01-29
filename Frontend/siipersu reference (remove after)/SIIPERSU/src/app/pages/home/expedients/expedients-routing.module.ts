import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpedientsPage } from './expedients.page';

const routes: Routes = [
  {
    path: '',
    component: ExpedientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpedientsPageRoutingModule {}
