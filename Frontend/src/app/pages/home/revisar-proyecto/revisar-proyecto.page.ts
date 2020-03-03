import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { formatDate } from '@angular/common';
import { ProyectoActivoPage } from '../components/proyecto-activo/proyecto-activo.page';
import {InformeActivoPage} from '../components/informe-activo/informe-activo.page';

@Component({
  selector: 'app-revisar-proyecto',
  templateUrl: './revisar-proyecto.page.html',
  styleUrls: ['./revisar-proyecto.page.scss', '../../../app.component.scss'],
})
export class RevisarProyectoPage implements OnInit {

  proyectos = '';
  comentario_rechazo = '';
  userType = '';

  constructor(private router: Router,
              private auth: AuthService,
              public toastController: ToastController,
              private modalController: ModalController,
              public alertController: AlertController) { }

  ngOnInit() {
    this.getRevisarProyecto();
  }

  async getRevisarProyecto() {
    const resp = await this.auth.getRevisarProyecto();
    console.log(resp);
    if (resp) {
      this.proyectos = resp;
    } else {
      this.proyectos = null;
    }
  }

  async openModal(folio) {
    const modal: HTMLIonModalElement =
        await this.modalController.create({
          component: ProyectoActivoPage,
          cssClass: 'modal-class',
          componentProps: {
            proyecto: folio,
          }
        });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        console.log('The result:', detail.data);
      }
    });

    await modal.present();
  }

  async alertConfirm(proyecto) {
    const alert = await this.alertController.create({
      header: 'Aceptar Comision',
      message: '¿Desea aceptar esta solicitud?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            proyecto.status = 2;
            proyecto.comentario_rechazo = '';
            this.revisarProyecto(proyecto);
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
    alert.onDidDismiss().then(() => this.getRevisarProyecto());
  }

  async alertDecline(proyecto) {
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
            proyecto.status = 2;
            proyecto.comentario_rechazo = data.name1;
            this.revisarProyecto(proyecto);
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
    alert.onDidDismiss().then(() => this.getRevisarProyecto());
  }

  async revisarProyecto(proyecto) {
      const resp1 = await this.auth.revisarProyecto(proyecto);
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
