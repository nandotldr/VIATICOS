import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import {ModificarPerfilPageModule} from '../components/modificar-perfil/modificar-perfil.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ModificarPerfilPageModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
