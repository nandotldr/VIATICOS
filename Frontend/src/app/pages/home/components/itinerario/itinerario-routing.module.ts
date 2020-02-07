import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItinerarioPage } from './itinerario.page';

const routes: Routes = [
  {
    path: '',
    component: ItinerarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItinerarioPageRoutingModule {}
