import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { formatDate } from '@angular/common';
import { ComisionActivaPage } from '../components/comision-activa/comision-activa.page';

@Component({
  selector: 'app-revisar-comision',
  templateUrl: './revisar-comision.page.html',
  styleUrls: ['./revisar-comision.page.scss', '../../../app.component.scss'],
})
export class RevisarComisionPage implements OnInit {

  comisiones = null;
  comentario_rechazo = '';
  userType = '';
  constructor(
      private auth: AuthService,
      public toastController: ToastController,
      private modalController: ModalController,
      public alertController: AlertController
  ) { }

  ngOnInit() {
    this.getRevisarComision();
  }

  async getRevisarComision() {
    const resp = await this.auth.getRevisarComision();
    console.log(resp);
    if (resp) {
      resp.forEach(element => {
        element.fecha_solicitud = formatDate(element.fecha_solicitud, 'yyyy-MM-dd', 'en');
      });
      this.comisiones = resp;
    } else {
      this.comisiones = null;
    }
  }

  async openModal(id_comision) {
    const modal: HTMLIonModalElement =
        await this.modalController.create({
          component: ComisionActivaPage,
          cssClass: 'modal-class',
          componentProps: {
            comision: id_comision,
          }
        });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        console.log('The result:', detail.data);
      }
    });

    await modal.present();
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
      message: 'Usuario Modificado.',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async alertConfirm(comision) {
    const alert = await this.alertController.create({
      header: 'Aceptar Comision',
      message: '¿Desea aceptar esta solicitud?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            if(this.auth.userType == 'A')
            {
              comision.status = 5;
            }
            if(this.auth.userType == 'J')
            {
              comision.status = 3;
            }
            comision.comentario_rechazo = '';
            this.revisarSolicitud(comision);
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }
      ]
    });
    await alert.present();
    alert.onDidDismiss().then(() => this.getRevisarComision());
  }

  async alertDecline(comision) {
    const alert = await this.alertController.create({
      header: 'Rechazar Comision!',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Inserte su justificación...'
        }
      ],
      buttons: [
        {
          text: 'Rechazar',
          handler: data => {
            if(this.auth.userType == 'A')
              comision.status = 4;
            if(this.auth.userType == 'J')
              comision.status = 2;
            comision.comentario_rechazo = data.name1;
            this.revisarSolicitud(comision);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });

    await alert.present();
    alert.onDidDismiss().then(() => this.getRevisarComision());
  }

  async revisarSolicitud(comision) {
      const resp1 = await this.auth.revisarSolicitud(comision);
      if (resp1) {
        this.presentToastSuccess();
      } else {
        // this.presentToast();
      }
  }
}
