import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProyectoActivoPage } from './proyecto-activo.page';

const routes: Routes = [
  {
    path: '',
    component: ProyectoActivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectoActivoPageRoutingModule {}
