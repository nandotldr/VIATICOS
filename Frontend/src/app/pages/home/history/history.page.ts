import { ViaticoPage } from './../viatico/viatico.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {ModalController, ToastController} from '@ionic/angular';
import { ProgramPage } from '../components/program/program.page';
import {OverlayEventDetail} from '@ionic/core';
import { formatDate } from "@angular/common";
import { ComisionActivaPage } from '../components/comision-activa/comision-activa.page';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss', '../../../app.component.scss'],
})

export class HistoryPage implements OnInit {
  comi = '';
  comisiones = null;
  
  constructor(
    private router: Router,
    private auth: AuthService,
    public toastController: ToastController,
    private modalController: ModalController
    ) { }

  ngOnInit() {
    this.getAllComisiones();
  }

  async getAllComisiones() {
    const resp = await this.auth.getAllComisiones();
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

  itemSelected(comision) {

  }

  async viaticos(id_comision: string) {
    const resp = await this.auth.getComision(id_comision);
    if (resp) {
      console.log(resp);

    } else {
      this.presentToast();
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

  async openModalP(id_comision) {
    const modal: HTMLIonModalElement =
       await this.modalController.create({
          component: ProgramPage,
          componentProps: {
            id_comision: id_comision,
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
