import { ViaticoActivoPage } from './../components/viatico-activo/viatico-activo.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-revisar-viatico',
  templateUrl: './revisar-viatico.page.html',
  styleUrls: ['./revisar-viatico.page.scss', '../../../app.component.scss'],
})
export class RevisarViaticoPage implements OnInit {

  viaticos = null;
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
    this.getRevisarComision();
  }

  async getRevisarComision() {
    const resp = await this.auth.getRevisarViatico();
    console.log(resp);
    if (resp) {
      resp.forEach(element => {
        element.fecha_solicitud = formatDate(element.fecha_solicitud, 'yyyy-MM-dd', 'en');
      });
      this.viaticos = resp;
    } else {
      this.viaticos = null;
    }
  }

  async openModal(id_viatico) {
    const modal: HTMLIonModalElement =
        await this.modalController.create({
          component: ViaticoActivoPage,
          cssClass: 'modal-class',
          componentProps: {
            viatico: id_viatico,
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

  async alertConfirm(viatico) {
    const alert = await this.alertController.create({
      header: 'Aceptar Comision',
      message: '¿Desea aceptar esta solicitud?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            if(this.auth.userType == 'A')
            {
              viatico.status = 5;
            }
            if(this.auth.userType == 'J')
            {
              viatico.status = 3;
            }
            viatico.comentario_rechazo = '';
            this.revisarViatico(viatico);
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

  async alertDecline(viatico) {
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
              viatico.status = 4;
            if(this.auth.userType == 'J')
              viatico.status = 2;
            viatico.comentario_rechazo = data.name1;
            this.revisarViatico(viatico);
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

  async revisarViatico(viatico) {
      const resp1 = await this.auth.revisarViatico(viatico);
      if (resp1) {
        this.presentToastSuccess();
      } else {
        // this.presentToast();
      }
  }

}
