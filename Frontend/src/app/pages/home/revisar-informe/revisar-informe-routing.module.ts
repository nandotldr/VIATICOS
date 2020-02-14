import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevisarInformePage } from './revisar-informe.page';

const routes: Routes = [
  {
    path: '',
    component: RevisarInformePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisarInformePageRoutingModule {}
