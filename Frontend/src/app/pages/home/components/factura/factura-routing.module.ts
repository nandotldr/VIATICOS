import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturaPage } from './factura.page';

const routes: Routes = [
  {
    path: '',
    component: FacturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturaPageRoutingModule {}
