import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViaticoPage } from './viatico.page';

const routes: Routes = [
  {
    path: '',
    component: ViaticoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViaticoPageRoutingModule {}
