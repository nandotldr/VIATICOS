import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GastoActivoPageRoutingModule } from './gasto-activo-routing.module';

import { GastoActivoPage } from './gasto-activo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GastoActivoPageRoutingModule
  ],
  declarations: [GastoActivoPage]
})
export class GastoActivoPageModule {}
