import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { AuthService } from '../../../../services/auth.service';
import { DetailAgendaPage } from '../detail-agenda/detail-agenda.page';
import { DetailFacturaPage } from '../detail-factura/detail-factura.page';
import { DetailItinerarioPage } from '../detail-itinerario/detail-itinerario.page';
import {OverlayEventDetail} from "@ionic/core";

@Component({
  selector: 'app-informe-activo',
  templateUrl: './informe-activo.page.html',
  styleUrls: ['./informe-activo.page.scss'],
})
export class InformeActivoPage implements OnInit {
  informe = '';
  folio = '';

  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private auth: AuthService,
              private toastController: ToastController,
              ) {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.folio = this.navParams.get('folio');
    console.log(this.folio);
    this.getInforme(this.folio);
  }

  async getInforme(informe) {
    const resp = await this.auth.getInforme( {
      id_solicitud_comision: informe,
      resultados: '',
      observaciones: 0
    }).toPromise();
    if (resp) {
      this.informe = resp['body'];
      console.log(this.informe);
    } else {
      console.log('no jalo');
    }
  }

  async detalleAgenda(informe) {
    const modal: HTMLIonModalElement =
        await this.modalController.create({
          component: DetailAgendaPage,
          cssClass: 'modal-class',
          componentProps: {
            id_informe: informe,
            modificable: false
          }
        });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        // console.log('The result:', detail.data);
      }
    });

    await modal.present();
  }

  async detalleItinerario(informe) {
    const modal: HTMLIonModalElement =
        await this.modalController.create({
          component: DetailItinerarioPage,
          cssClass: 'modal-class',
          componentProps: {
            id_informe: informe,
            modificable: false
          }
        });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        // console.log('The result:', detail.data);
      }
    });

    await modal.present();
  }

  async detalleFactura(informe) {
    const modal: HTMLIonModalElement =
        await this.modalController.create({
          component: DetailFacturaPage,
          cssClass: 'modal-class',
          componentProps: {
            id_informe: informe,
            modificable: false
          }
        });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        // console.log('The result:', detail.data);
      }
    });

    await modal.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Datos no Validos',
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
