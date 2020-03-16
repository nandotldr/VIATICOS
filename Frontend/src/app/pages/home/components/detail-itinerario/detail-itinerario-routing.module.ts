import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailItinerarioPage } from './detail-itinerario.page';

const routes: Routes = [
  {
    path: '',
    component: DetailItinerarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailItinerarioPageRoutingModule {}
