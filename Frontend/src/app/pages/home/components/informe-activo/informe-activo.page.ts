import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { AuthService } from '../../../../services/auth.service';
import { NavController } from '@ionic/angular';
import { formatDate } from '@angular/common';

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
              private navCtrl: NavController,
              private toastController: ToastController,
              private formBuilder: FormBuilder) {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.folio = this.navParams.get('folio');
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
