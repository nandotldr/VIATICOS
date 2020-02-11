import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { AuthService } from '../../../../services/auth.service';
import { NavController } from "@ionic/angular";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-comision-activa',
  templateUrl: './comision-activa.page.html',
  styleUrls: ['./comision-activa.page.scss'],
})
export class ComisionActivaPage implements OnInit {
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
                this.fgModify = this.formBuilder.group({
                  nombres: new FormControl(this.comision, []),
                  apellidos: new FormControl(this.comision, []),
                  area_adscripcion: new FormControl(this.comision, []),
                  plaza_laboral: new FormControl(this.comision, []),
                  nss: new FormControl(this.comision, [])
                });
  }
  ionViewWillEnter() {
    this.comision = this.navParams.get('comision');
    console.log(this.comision);
    this.getComision(this.comision);
    console.log(this.comi);
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

  async modifyUsuario(){
    if (this.fgModify.valid) {
      console.log(this.fgModify.value);
      const resp = await this.auth.modifyUsuario(this.fgModify.value);
      if (resp) {
        this.presentToastSuccess();
      } else {
        console.log(resp);
        this.presentToast();
      }
    } else {
      this.presentToast();
    }
    this.closeModal();
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
