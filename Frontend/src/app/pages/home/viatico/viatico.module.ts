import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViaticoPageRoutingModule } from './viatico-routing.module';

import { ViaticoPage } from './viatico.page';
import { CrearGastoPageModule } from '../components/crear-gasto/crear-gasto.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ViaticoPageRoutingModule,
    CrearGastoPageModule
  ],
  exports:[
    ViaticoPage
  ],
  declarations: [ViaticoPage]
})
export class ViaticoPageModule {}
