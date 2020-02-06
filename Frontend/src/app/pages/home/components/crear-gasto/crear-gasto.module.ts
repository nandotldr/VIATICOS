import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearGastoPageRoutingModule } from './crear-gasto-routing.module';

import { CrearGastoPage } from './crear-gasto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearGastoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrearGastoPage],
  entryComponents: [CrearGastoPage]
})
export class CrearGastoPageModule {}
