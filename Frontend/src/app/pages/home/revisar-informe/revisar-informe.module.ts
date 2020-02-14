import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevisarInformePageRoutingModule } from './revisar-informe-routing.module';

import { RevisarInformePage } from './revisar-informe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevisarInformePageRoutingModule
  ],
  declarations: [RevisarInformePage]
})
export class RevisarInformePageModule {}
