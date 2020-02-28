import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { formatDate } from '@angular/common';
import { InformeActivoPage } from '../components/informe-activo/informe-activo.page';

@Component({
  selector: 'app-revisar-informe',
  templateUrl: './revisar-informe.page.html',
  styleUrls: ['./revisar-informe.page.scss', '../../../app.component.scss'],
})
export class RevisarInformePage implements OnInit {

  informes = '';
  comentario_rechazo = '';
  userType = '';
  constructor(
      private router: Router,
      private auth: AuthService,
      public toastController: ToastController,
      private modalController: ModalController,
      public alertController: AlertController
  ) { }

  ngOnInit() {
    this.getRevisarInforme();
  }

  async getRevisarInforme() {
    const resp = await this.auth.getRevisarInforme();
    console.log(resp);
    if (resp) {
      resp.forEach(element => {
        element.fecha_elaboracion = formatDate(element.fecha_elaboracion, 'yyyy-MM-dd', 'en');
      });
      this.informes = resp;
    } else {
      this.informes = null;
    }
  }

  async openModal(folio) {
    const modal: HTMLIonModalElement =
        await this.modalController.create({
          component: InformeActivoPage,
          cssClass: 'modal-class',
          componentProps: {
            folio: folio,
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

  async alertConfirm(informe) {
    const alert = await this.alertController.create({
      header: 'Aceptar Informe',
      message: '¿Desea aceptar este informe?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            if(this.auth.userType == 'A')
            {
              informe.status = 6;
            }
            if(this.auth.userType == 'F')
            {
              informe.status = 3;
            }
            informe.comentario_rechazo = '';
            this.revisarInforme(informe);
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
    alert.onDidDismiss().then(() => this.getRevisarInforme());
  }

  async alertDecline(informe) {
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
              informe.status = 4;
            if(this.auth.userType == 'F')
              informe.status = 2;
            informe.comentario_rechazo = data.name1;
            this.revisarInforme(informe);
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
    alert.onDidDismiss().then(() => this.getRevisarInforme());
  }

  async revisarInforme(comision) {
    const resp1 = await this.auth.revisarInforme(comision);
    if (resp1) {
      this.presentToastSuccess();
    } else {
      // this.presentToast();
    }
  }
}
