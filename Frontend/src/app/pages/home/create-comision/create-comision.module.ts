import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramPageModule } from "../program/program.module";
import { IonicModule } from '@ionic/angular';

import { CreateComisionPageRoutingModule } from './create-comision-routing.module';

import { CreateComisionPage } from './create-comision.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreateComisionPageRoutingModule,
    ProgramPageModule
  ],
  declarations: [CreateComisionPage]
})
export class CreateComisionPageModule {}
