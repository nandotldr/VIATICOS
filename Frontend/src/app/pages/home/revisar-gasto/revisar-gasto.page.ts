import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { GastoActivoPage} from '../components/gasto-activo/gasto-activo.page';

@Component({
  selector: 'app-revisar-gasto',
  templateUrl: './revisar-gasto.page.html',
  styleUrls: ['./revisar-gasto.page.scss', '../../../app.component.scss'],
})
export class RevisarGastoPage implements OnInit {

  gastos = '';
  comentario_rechazo = '';
  userType = '';

  constructor(
      private auth: AuthService,
      public toastController: ToastController,
      private modalController: ModalController,
      public alertController: AlertController) { }

  ngOnInit() {
    this. getRevisarGasto();
  }

  async getRevisarGasto() {
    const resp = await this.auth.getRevisarGasto();
    console.log(resp);
    if (resp) {
      this.gastos = resp;
    } else {
      this.gastos = null;
    }
  }

  async openModal(id) {
    const modal: HTMLIonModalElement =
        await this.modalController.create({
          component: GastoActivoPage,
          cssClass: 'modal-class',
          componentProps: {
            gasto: id,
          }
        });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        console.log('The result', detail.data);
      }
    });

    await  modal.present();
  }

  async alertConfirm(gasto) {
    const alert = await this.alertController.create({
      header: 'Aceptar Gasto',
      message: '¿Desea aceptar este gasto?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            if (this.auth.userType === 'A') {
              gasto.estatus = 5;
            }
            gasto.comentario_rechazo = '';
            if (this.auth.userType === 'F') {
              gasto.estatus = 3;
            }
            gasto.comentario_rechazo = '';
            this.revisarGasto(gasto);
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
    alert.onDidDismiss().then(() => this.getRevisarGasto());
  }

  async alertDecline(gasto) {
    const alert = await this.alertController.create({
      header: 'Rechazar Gasto!',
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
            if (this.auth.userType === 'A') {
              gasto.estatus = 4;
            }
            if (this.auth.userType === 'F') {
              gasto.estatus = 2;
            }
            gasto.comentario_rechazo = data.name1;
            this.revisarGasto(gasto);
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
    alert.onDidDismiss().then(() => this.getRevisarGasto());
  }

  async revisarGasto(gasto) {
    const resp1 = await this.auth.revisarGasto(gasto);
    if (resp1) {
      this.presentToastSuccess();
    } else {
      // this.presentToast();
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
      message: 'Usuario Modificado.',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
