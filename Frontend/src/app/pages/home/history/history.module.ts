import { ViaticoPageModule } from './../components/viatico/viatico.module';
import { ModificarComisionPageModule } from './../components/modificar-comision/modificar-comision.module';
import { ProgramPageModule } from './../components/program/program.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComisionActivaPageModule } from  '../components/comision-activa/comision-activa.module';
import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
    ModificarComisionPageModule,
    ProgramPageModule,
    ViaticoPageModule
  ],
  declarations: [HistoryPage]
})
export class HistoryPageModule {}
