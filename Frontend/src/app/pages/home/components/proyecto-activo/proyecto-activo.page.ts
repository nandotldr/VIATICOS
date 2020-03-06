import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-proyecto-activo',
  templateUrl: './proyecto-activo.page.html',
  styleUrls: ['./proyecto-activo.page.scss'],
})
export class ProyectoActivoPage implements OnInit {

  proyecto = '1';
  proyect = '';
  fgModify: FormGroup;
  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private auth: AuthService,
              private toastController: ToastController,
              ) {
                this.ionViewWillEnter();
  }
  ionViewWillEnter() {
    this.proyecto = this.navParams.get('proyecto');
    this.getProyecto(this.proyecto);
  }

  async myDismiss() {
    const result: Date = new Date();

    await this.modalController.dismiss(result);
  }
  async getProyecto(proyecto_id) {
    const resp = await this.auth.getProyecto(proyecto_id);

    if (resp) {
      this.proyect = resp;
     
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
