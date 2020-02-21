import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevisarProyectoPage } from './revisar-proyecto.page';

const routes: Routes = [
  {
    path: '',
    component: RevisarProyectoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisarProyectoPageRoutingModule {}
