import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailItinerarioPageRoutingModule } from './detail-itinerario-routing.module';

import { DetailItinerarioPage } from './detail-itinerario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailItinerarioPageRoutingModule
  ],
  declarations: [DetailItinerarioPage]
})
export class DetailItinerarioPageModule {}
