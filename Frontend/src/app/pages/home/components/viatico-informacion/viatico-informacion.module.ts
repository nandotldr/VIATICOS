import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViaticoInformacionPageRoutingModule } from './viatico-informacion-routing.module';

import { ViaticoInformacionPage } from './viatico-informacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViaticoInformacionPageRoutingModule
  ],
  declarations: [ViaticoInformacionPage]
})
export class ViaticoInformacionPageModule {}
