import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailFacturaPage } from './detail-factura.page';

const routes: Routes = [
  {
    path: '',
    component: DetailFacturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailFacturaPageRoutingModule {}
