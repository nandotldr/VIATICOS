import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevisarGastoPage } from './revisar-gasto.page';

const routes: Routes = [
  {
    path: '',
    component: RevisarGastoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisarGastoPageRoutingModule {}
