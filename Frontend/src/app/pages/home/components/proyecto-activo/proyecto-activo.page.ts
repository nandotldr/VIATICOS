import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { AuthService } from '../../../../services/auth.service';
import { NavController } from "@ionic/angular";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-proyecto-activo',
  templateUrl: './proyecto-activo.page.html',
  styleUrls: ['./proyecto-activo.page.scss'],
})
export class ProyectoActivoPage implements OnInit {

  viatico = '1';
  viatic = '';
  fgModify: FormGroup;
  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private auth: AuthService,
              private navCtrl: NavController,
              private toastController: ToastController,
              private formBuilder: FormBuilder) {
                this.ionViewWillEnter();
  }
  ionViewWillEnter() {
    this.viatico = this.navParams.get('viatico');
    this.getViatico(this.viatico);
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
    } else {
      console.log('no jalo')
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
