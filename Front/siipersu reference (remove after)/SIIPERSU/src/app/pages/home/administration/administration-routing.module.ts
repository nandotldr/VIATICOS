import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrationPage } from './administration.page';

const routes: Routes = [
  {
    path: '',
    component: AdministrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationPageRoutingModule {}
