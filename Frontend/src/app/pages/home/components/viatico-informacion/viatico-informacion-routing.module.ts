import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViaticoInformacionPage } from './viatico-informacion.page';

const routes: Routes = [
  {
    path: '',
    component: ViaticoInformacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViaticoInformacionPageRoutingModule {}
