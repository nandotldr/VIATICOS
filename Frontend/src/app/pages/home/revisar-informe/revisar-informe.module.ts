import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevisarInformePageRoutingModule } from './revisar-informe-routing.module';

import { RevisarInformePage } from './revisar-informe.page';

import { InformeActivoPageModule} from '../components/informe-activo/informe-activo.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevisarInformePageRoutingModule,
      InformeActivoPageModule
      
  ],
  declarations: [RevisarInformePage]
})
export class RevisarInformePageModule {}
