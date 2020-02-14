import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformeActivoPageRoutingModule } from './informe-activo-routing.module';

import { InformeActivoPage } from './informe-activo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformeActivoPageRoutingModule
  ],
  declarations: [InformeActivoPage]
})
export class InformeActivoPageModule {}
