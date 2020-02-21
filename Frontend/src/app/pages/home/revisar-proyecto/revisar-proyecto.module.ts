import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevisarProyectoPageRoutingModule } from './revisar-proyecto-routing.module';

import { RevisarProyectoPage } from './revisar-proyecto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevisarProyectoPageRoutingModule
  ],
  declarations: [RevisarProyectoPage]
})
export class RevisarProyectoPageModule {}
