import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailAgendaPageRoutingModule } from './detail-agenda-routing.module';

import { DetailAgendaPage } from './detail-agenda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailAgendaPageRoutingModule
  ],
  declarations: [DetailAgendaPage]
})
export class DetailAgendaPageModule {}
