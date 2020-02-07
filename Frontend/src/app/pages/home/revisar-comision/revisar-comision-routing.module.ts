import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevisarComisionPage } from './revisar-comision.page';

const routes: Routes = [
  {
    path: '',
    component: RevisarComisionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisarComisionPageRoutingModule {}
