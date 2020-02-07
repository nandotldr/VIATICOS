import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViaticoPageRoutingModule } from './viatico-routing.module';

import { ViaticoPage } from './viatico.page';
import { CrearGastoPageModule } from '../components/crear-gasto/crear-gasto.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ViaticoPageRoutingModule,
    CrearGastoPageModule,
    NgxDatatableModule
  ],
  exports:[
    ViaticoPage
  ],
  declarations: [ViaticoPage]
})
export class ViaticoPageModule {}
