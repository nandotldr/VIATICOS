import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialViaticosPage } from './historial-viaticos.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialViaticosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialViaticosPageRoutingModule {}
