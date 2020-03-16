import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-gasto-activo',
  templateUrl: './gasto-activo.page.html',
  styleUrls: ['./gasto-activo.page.scss'],
})
export class GastoActivoPage implements OnInit {

  gasto: any;

  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private auth: AuthService,
              private toastController: ToastController
  ) {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.gasto = this.navParams.get('gasto');
    this.getGasto(this.gasto);
  }

  // tslint:disable-next-line:variable-name
  async getGasto(gasto_id) {
    const resp = await this.auth.getOneGasto(gasto_id);

    if (resp) {
      this.gasto = resp;
    } else {
      console.log('Error');
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
}
