import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepartmentPageRoutingModule } from './department-routing.module';

import { DepartmentPage } from './department.page';
import {ComponentsModule} from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepartmentPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DepartmentPage]
})
export class DepartmentPageModule {}
