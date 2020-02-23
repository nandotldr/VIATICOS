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
  styleUrls: ['./revisar-proyecto.page.scss'],
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
      resp.forEach(element => {
        element.fecha_elaboracion = formatDate(element.fecha_elaboracion, 'yyyy-MM-dd', 'en');
      });
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
}
