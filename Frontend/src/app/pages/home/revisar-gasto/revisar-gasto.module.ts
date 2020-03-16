import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevisarGastoPageRoutingModule } from './revisar-gasto-routing.module';

import { RevisarGastoPage } from './revisar-gasto.page';

import { GastoActivoPageModule } from '../components/gasto-activo/gasto-activo.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevisarGastoPageRoutingModule,
      GastoActivoPageModule
  ],
  declarations: [RevisarGastoPage]
})
export class RevisarGastoPageModule {}
