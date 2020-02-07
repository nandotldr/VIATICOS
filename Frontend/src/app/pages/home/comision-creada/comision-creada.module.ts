import { ProgramPageModule } from './../components/program/program.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComisionCreadaPageRoutingModule } from './comision-creada-routing.module';

import { ComisionCreadaPage } from './comision-creada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComisionCreadaPageRoutingModule,
    ProgramPageModule,
    ReactiveFormsModule
  ],
  declarations: [ComisionCreadaPage]
})
export class ComisionCreadaPageModule {}
