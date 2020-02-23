import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProyectoActivoPageRoutingModule } from './proyecto-activo-routing.module';

import { ProyectoActivoPage } from './proyecto-activo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProyectoActivoPageRoutingModule
  ],
  declarations: [ProyectoActivoPage]
})
export class ProyectoActivoPageModule {}
