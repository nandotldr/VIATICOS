import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import {ComponentsModule} from '../../../components/components.module';
import {PopConfirmationComponent} from '../../../components/pop-confirmation/pop-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    PopConfirmationComponent,
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
