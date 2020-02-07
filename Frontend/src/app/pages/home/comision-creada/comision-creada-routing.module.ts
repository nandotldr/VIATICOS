import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComisionCreadaPage } from './comision-creada.page';

const routes: Routes = [
  {
    path: '',
    component: ComisionCreadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComisionCreadaPageRoutingModule {}
