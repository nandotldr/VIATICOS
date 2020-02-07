import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearInformePageRoutingModule } from './crear-informe-routing.module';

import { CrearInformePage } from './crear-informe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearInformePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrearInformePage]
})
export class CrearInformePageModule {}
