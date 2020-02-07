import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialViaticosPageRoutingModule } from './historial-viaticos-routing.module';

import { HistorialViaticosPage } from './historial-viaticos.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ViaticoInformacionPageModule } from '../components/viatico-informacion/viatico-informacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialViaticosPageRoutingModule,
    NgxDatatableModule,
    ViaticoInformacionPageModule
  ],
  declarations: [HistorialViaticosPage]
})
export class HistorialViaticosPageModule {}
