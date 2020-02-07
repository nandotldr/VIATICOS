import { ItinerarioPageModule } from './../components/itinerario/itinerario.module';
import { FacturaPageModule } from './../components/factura/factura.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearInformePageRoutingModule } from './crear-informe-routing.module';

import { CrearInformePage } from './crear-informe.page';
import { AgendaPageModule } from '../components/agenda/agenda.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearInformePageRoutingModule,
    ReactiveFormsModule,
    AgendaPageModule,
    FacturaPageModule,
    ItinerarioPageModule
  ],
  declarations: [CrearInformePage]
})
export class CrearInformePageModule {}
