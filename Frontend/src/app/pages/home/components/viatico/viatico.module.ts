import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViaticoPageRoutingModule } from './viatico-routing.module';

import { ViaticoPage } from './viatico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViaticoPageRoutingModule
  ],
  declarations: [ViaticoPage]
})
export class ViaticoPageModule {}
