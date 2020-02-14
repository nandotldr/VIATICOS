import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViaticoProyectoPageRoutingModule } from './viatico-proyecto-routing.module';

import { ViaticoProyectoPage } from './viatico-proyecto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ViaticoProyectoPageRoutingModule
  ],
  declarations: [ViaticoProyectoPage]
})
export class ViaticoProyectoPageModule {}
