import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformeActivoPage } from './informe-activo.page';

const routes: Routes = [
  {
    path: '',
    component: InformeActivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformeActivoPageRoutingModule {}
