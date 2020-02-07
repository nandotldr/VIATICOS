import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { formatDate } from "@angular/common";
import { ComisionActivaPage } from "../components/comision-activa/comision-activa.page";

@Component({
  selector: 'app-revisar-comision',
  templateUrl: './revisar-comision.page.html',
  styleUrls: ['./revisar-comision.page.scss'],
})
export class RevisarComisionPage implements OnInit {

  comisiones = null;

  constructor(
      private router: Router,
      private auth: AuthService,
      public toastController: ToastController,
      private modalController: ModalController
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
      console.log(this.comisiones);
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
}
