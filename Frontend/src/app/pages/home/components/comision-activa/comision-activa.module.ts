import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComisionActivaPageRoutingModule } from './comision-activa-routing.module';

import { ComisionActivaPage } from './comision-activa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComisionActivaPageRoutingModule
  ],
  declarations: [ComisionActivaPage]
})
export class ComisionActivaPageModule {}
