import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailFacturaPageRoutingModule } from './detail-factura-routing.module';

import { DetailFacturaPage } from './detail-factura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailFacturaPageRoutingModule
  ],
  declarations: [DetailFacturaPage]
})
export class DetailFacturaPageModule {}
