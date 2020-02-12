import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarComisionPage } from './modificar-comision.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarComisionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarComisionPageRoutingModule {}
