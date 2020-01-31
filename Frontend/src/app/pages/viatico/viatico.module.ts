import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViaticoPageRoutingModule } from './viatico-routing.module';

import { ViaticoPage } from './viatico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViaticoPageRoutingModule
  ],
  declarations: [ViaticoPage]
})
export class ViaticoPageModule {}
