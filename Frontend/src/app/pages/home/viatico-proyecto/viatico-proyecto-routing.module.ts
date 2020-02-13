import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViaticoProyectoPage } from './viatico-proyecto.page';

const routes: Routes = [
  {
    path: '',
    component: ViaticoProyectoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViaticoProyectoPageRoutingModule {}
