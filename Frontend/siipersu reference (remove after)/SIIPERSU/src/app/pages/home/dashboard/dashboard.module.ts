import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import {ComponentsModule} from '../../../components/components.module';
import {PopConfirmationComponent} from '../../../components/pop-confirmation/pop-confirmation.component';
import {PopNewComponent} from '../../../components/dashboard/pop-new/pop-new.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    ComponentsModule
  ],
  entryComponents: [
    PopConfirmationComponent,
    PopNewComponent
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
