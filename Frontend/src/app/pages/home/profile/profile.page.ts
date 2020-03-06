import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { OverlayEventDetail } from '@ionic/core';
import { ModificarPerfilPage } from '../components/modificar-perfil/modificar-perfil.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss', '../../../app.component.scss'],
})
export class ProfilePage implements OnInit {
perfil = '';

  constructor(
              private auth: AuthService,
              public toastController: ToastController,
              private modalController: ModalController,
            ) {
  }

  ngOnInit() {
    this.getUsuario();
  }

  async getUsuario() {
    const resp = await this.auth.getUsuario(localStorage.getItem('id_usuario'));
    if (resp) {
      this.perfil = resp;
      console.log(this.perfil);
      this.presentToastSuccess();
    } else {
      this.presentToast();
    }

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Datos no validos.',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async presentToastSuccess() {
    const toast = await this.toastController.create({
      message: 'Perfil correctamente cargado.',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async openModal() {
    const modal: HTMLIonModalElement =
        await this.modalController.create({
          component: ModificarPerfilPage,
          cssClass: 'modal-class',
          componentProps: {
            perfil: this.perfil
          }
        });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        this.getUsuario();
      }
    });

    await modal.present();

  }
}
