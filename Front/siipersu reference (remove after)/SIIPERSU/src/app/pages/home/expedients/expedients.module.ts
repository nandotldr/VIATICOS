import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpedientsPageRoutingModule } from './expedients-routing.module';

import { ExpedientsPage } from './expedients.page';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ComponentsModule} from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpedientsPageRoutingModule,
    NgxDatatableModule,
    ComponentsModule
  ],
  declarations: [ExpedientsPage]
})
export class ExpedientsPageModule {}
