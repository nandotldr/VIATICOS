import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanAndReportsPageRoutingModule } from './plan-and-reports-routing.module';

import { PlanAndReportsPage } from './plan-and-reports.page';
import {ComponentsModule} from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanAndReportsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PlanAndReportsPage]
})
export class PlanAndReportsPageModule {}
