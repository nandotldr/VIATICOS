import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevisarProyectoPageRoutingModule } from './revisar-proyecto-routing.module';

import { RevisarProyectoPage } from './revisar-proyecto.page';

import { ProyectoActivoPageModule } from '../components/proyecto-activo/proyecto-activo.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevisarProyectoPageRoutingModule,
      ProyectoActivoPageModule
  ],
  declarations: [RevisarProyectoPage]
})
export class RevisarProyectoPageModule {}
