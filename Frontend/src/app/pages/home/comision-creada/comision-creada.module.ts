import { ProgramPageModule } from './../components/program/program.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComisionCreadaPageRoutingModule } from './comision-creada-routing.module';

import { ComisionCreadaPage } from './comision-creada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComisionCreadaPageRoutingModule,
    ProgramPageModule
  ],
  declarations: [ComisionCreadaPage]
})
export class ComisionCreadaPageModule {}
