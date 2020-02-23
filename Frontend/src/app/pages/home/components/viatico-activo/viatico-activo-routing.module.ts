import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViaticoActivoPage } from './viatico-activo.page';

const routes: Routes = [
  {
    path: '',
    component: ViaticoActivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViaticoActivoPageRoutingModule {}
