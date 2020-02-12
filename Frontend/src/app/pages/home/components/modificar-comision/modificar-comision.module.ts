import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarComisionPageRoutingModule } from './modificar-comision-routing.module';

import { ModificarComisionPage } from './modificar-comision.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarComisionPageRoutingModule
  ],
  declarations: [ModificarComisionPage]
})
export class ModificarComisionPageModule {}
