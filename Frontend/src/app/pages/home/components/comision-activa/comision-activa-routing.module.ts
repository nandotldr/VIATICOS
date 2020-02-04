import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComisionActivaPage } from './comision-activa.page';

const routes: Routes = [
  {
    path: '',
    component: ComisionActivaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComisionActivaPageRoutingModule {}
