import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GastoActivoPage } from './gasto-activo.page';

const routes: Routes = [
  {
    path: '',
    component: GastoActivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GastoActivoPageRoutingModule {}
