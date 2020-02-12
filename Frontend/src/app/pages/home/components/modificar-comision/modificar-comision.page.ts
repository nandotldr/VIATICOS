import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { AuthService } from '../../../../services/auth.service';
import { NavController } from "@ionic/angular";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-modificar-comision',
  templateUrl: './modificar-comision.page.html',
  styleUrls: ['./modificar-comision.page.scss'],
})
export class ModificarComisionPage implements OnInit {

  comision = '1';
  comi = '';
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
    this.comision = this.navParams.get('comision');
    this.getComision(this.comision);
  }

  async myDismiss() {
    const result: Date = new Date();

    await this.modalController.dismiss(result);
  }
  async getComision(comision_id) {
    const resp = await this.auth.getComision(comision_id);
    console.log(resp);
    if (resp) {
      resp.fecha_inicio = formatDate(resp.fecha_inicio, 'yyyy-MM-dd', 'en');
      resp.fecha_fin = formatDate(resp.fecha_fin, 'yyyy-MM-dd', 'en');
      this.comi = resp;
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
