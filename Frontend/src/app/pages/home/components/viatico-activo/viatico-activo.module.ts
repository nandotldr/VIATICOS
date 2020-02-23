import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViaticoActivoPageRoutingModule } from './viatico-activo-routing.module';

import { ViaticoActivoPage } from './viatico-activo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViaticoActivoPageRoutingModule
  ],
  declarations: [ViaticoActivoPage]
})
export class ViaticoActivoPageModule {}
