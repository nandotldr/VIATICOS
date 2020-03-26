import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailAgendaPageModule } from '../detail-agenda/detail-agenda.module';
import { DetailFacturaPageModule } from '../detail-factura/detail-factura.module';
import { DetailItinerarioPageModule } from '../detail-itinerario/detail-itinerario.module';

import { IonicModule } from '@ionic/angular';

import { InformeActivoPageRoutingModule } from './informe-activo-routing.module';

import { InformeActivoPage } from './informe-activo.page';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      InformeActivoPageRoutingModule,
      DetailAgendaPageModule,
      DetailFacturaPageModule,
      DetailItinerarioPageModule
  ],
  declarations: [InformeActivoPage]
})
export class InformeActivoPageModule {}
