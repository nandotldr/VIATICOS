import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {HomePageRoutingModule} from './home-routing.module';

import {HomePage} from './home.page';
import {ComponentsModule} from '../../components/components.module';
import {AppDataService} from '../../services/app-data.service';
import {PopConfirmationComponent} from '../../components/pop-confirmation/pop-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule
  ],
  declarations: [HomePage],
  entryComponents: [
    PopConfirmationComponent,
  ],
  providers: [
    AppDataService,
  ]
})
export class HomePageModule {
}
