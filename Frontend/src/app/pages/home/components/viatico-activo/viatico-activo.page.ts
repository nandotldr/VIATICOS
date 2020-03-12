import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { AuthService } from '../../../../services/auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-viatico-activo',
  templateUrl: './viatico-activo.page.html',
  styleUrls: ['./viatico-activo.page.scss'],
})
export class ViaticoActivoPage implements OnInit {

  viatico = '1';
  viatic = null;
  totalTotales = 0;

  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private auth: AuthService,
              private toastController: ToastController,
              ) {
                this.ionViewWillEnter();
  }
  ionViewWillEnter() {
    this.viatico = this.navParams.get('viatico');
    this.getViatico(this.viatico);
    console.log(this.viatic);
  }

  async myDismiss() {
    const result: Date = new Date();

    await this.modalController.dismiss(result);
  }
  async getViatico(comision_id) {
    const resp = await this.auth.getViatico(comision_id);
    if (resp) {
      resp.fecha_inicio = formatDate(resp.fecha_inicio, 'yyyy-MM-dd', 'en');
      resp.fecha_fin = formatDate(resp.fecha_fin, 'yyyy-MM-dd', 'en');
      this.viatic = resp;
      console.log(this.viatic);
      this.sumaTotales(this.viatic.gastos);
    } else {
      console.log('no jalo');
    }

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

  async sumaTotales( gastos ) {
    this.totalTotales = 0;
    gastos.forEach( gasto => {
      this.totalTotales +=
          gasto.alimentacion +
          gasto.hospedaje +
          gasto.transporte_foraneo +
          gasto.transporte_local +
          gasto.combustible +
          gasto.otros_conceptos;});
  }
  /*
  async deleteViatico(viatico){
    const resp = 1//await this.auth.deleteViatico(viatico);
    if (resp) {
      this.presentToast();
      } else {
      this.presentToast();
      }
    this.getViatico(this.viatico);
  }

  async modifyViatico(viatico){

    console.log(viatico);
    const resp = 1//await this.auth.modifyViatico(viatico);
    if (resp) {
        this.presentToast();
      } else {
        this.presentToast();
      }
    this.closeModal();
  }
*/
}
