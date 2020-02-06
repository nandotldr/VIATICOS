import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearGastoPage } from './crear-gasto.page';

const routes: Routes = [
  {
    path: '',
    component: CrearGastoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearGastoPageRoutingModule {}
