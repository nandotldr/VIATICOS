import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministrationPageRoutingModule } from './administration-routing.module';

import { AdministrationPage } from './administration.page';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministrationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdministrationPage]
})
export class AdministrationPageModule {}
