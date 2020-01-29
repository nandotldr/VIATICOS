import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurriculumPageRoutingModule } from './curriculum-routing.module';

import { CurriculumPage } from './curriculum.page';
import {ComponentsModule} from '../../../components/components.module';
import {PopConfirmationComponent} from '../../../components/pop-confirmation/pop-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurriculumPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CurriculumPage],
  entryComponents: [
    PopConfirmationComponent,
  ],
})
export class CurriculumPageModule {}
