import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../../../../services/auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-detail-itinerario',
  templateUrl: './detail-itinerario.page.html',
  styleUrls: ['./detail-itinerario.page.scss'],
})
export class DetailItinerarioPage implements OnInit {

  id_informe: number;

  itinerarios:
  [
    {
      dia: string,
      origen: string,
      destino: string,
      id: Number,
      id_informe_actividades: Number
    }
  ];

  constructor(private modalController: ModalController,
              public  alertController: AlertController,
              private navParams: NavParams,
              private auth: AuthService,
              private toastController: ToastController,
              private formBuilder: FormBuilder) {
              this.id_informe = this.navParams.get('id_informe');
  }
  ionViewWillEnter() {
    this.getItinerario();
  }

  ngOnInit() {
    
  }

  async myDismiss() {
    const result: Date = new Date();

    await this.modalController.dismiss(result);
  }
  
  async getItinerario() {
    try {
      const resp = await this.auth.getItinerario(this.id_informe);
      // tslint:disable-next-line
      if (resp['ok']) {
        console.log(resp);
        this.itinerarios = resp['body']
        // tslint:disable-next-line
      }
    } catch (error) {
      console.error(error);
    }
  }

  async modifyItinerario(itinerario){
    console.log(itinerario);
    const resp = await this.auth.modifyItinerario(itinerario);
    this.presentToast(resp['mensaje']);
  }

  async deleteItinerario(itinerario){
      itinerario.id_informe = this.id_informe;
      const resp = await this.auth.deleteItinerario(itinerario);
      if (resp) {
        this.presentToast(resp);
      } else {
        this.presentToast(resp);
      }
    this.getItinerario();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async presentToast(message: string) { 
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async presentToastSuccess() {
    const toast = await this.toastController.create({
      message: 'Comision Modificada.',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Comisión Enviada',
      // subHeader: 'Subtitle',
      message: 'Revisa el estado, cuando sea aceptada por Administrador, crea un viático en esta página.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
