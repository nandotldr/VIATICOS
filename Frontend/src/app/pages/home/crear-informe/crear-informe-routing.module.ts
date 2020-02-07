import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearInformePage } from './crear-informe.page';

const routes: Routes = [
  {
    path: '',
    component: CrearInformePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearInformePageRoutingModule {}
