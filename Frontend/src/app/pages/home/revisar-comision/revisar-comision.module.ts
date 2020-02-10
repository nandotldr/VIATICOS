import { ComisionActivaPageModule } from './../components/comision-activa/comision-activa.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RevisarComisionPageRoutingModule } from './revisar-comision-routing.module';

import { RevisarComisionPage } from './revisar-comision.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevisarComisionPageRoutingModule,
    ComisionActivaPageModule
  ],
  declarations: [RevisarComisionPage]
})
export class RevisarComisionPageModule {}
