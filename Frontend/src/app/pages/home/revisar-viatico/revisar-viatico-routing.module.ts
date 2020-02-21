import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevisarViaticoPage } from './revisar-viatico.page';

const routes: Routes = [
  {
    path: '',
    component: RevisarViaticoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisarViaticoPageRoutingModule {}
