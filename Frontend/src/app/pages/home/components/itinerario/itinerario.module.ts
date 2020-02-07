import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItinerarioPageRoutingModule } from './itinerario-routing.module';

import { ItinerarioPage } from './itinerario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItinerarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ItinerarioPage]
})
export class ItinerarioPageModule {}
