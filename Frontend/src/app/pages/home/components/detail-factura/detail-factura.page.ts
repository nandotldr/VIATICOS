import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../../../../services/auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-detail-factura',
  templateUrl: './detail-factura.page.html',
  styleUrls: ['./detail-factura.page.scss'],
})
export class DetailFacturaPage implements OnInit {

  id_informe: number;

  facturas:
  [
    {
      dia: string,
      origen: string,
      destino: string,
      id: Number,
      id_informe_actividades: Number
    }
  ];

  fgModify: FormGroup;
  constructor(private modalController: ModalController,
              public  alertController: AlertController,
              private navParams: NavParams,
              private auth: AuthService,
              private toastController: ToastController,
              private formBuilder: FormBuilder) {
              this.id_informe = this.navParams.get('id_informe');
  }
  ionViewWillEnter() {
    this.getFactura();
  }

  ngOnInit() {
    
  }

  async myDismiss() {
    const result: Date = new Date();

    await this.modalController.dismiss(result);
  }
  
  async getFactura() {
    try {
      const resp = await this.auth.getFactura(this.id_informe);
      // tslint:disable-next-line
      if (resp['ok']) {
        console.log(resp);
        this.facturas = resp['body']
        // tslint:disable-next-line
      }
    } catch (error) {
      console.error(error);
    }
  }

  async downloadFactura(id_factura) {
    try {
      const resp = await this.auth.downloadFactura(id_factura);
      // tslint:disable-next-line
      if (resp) {
        console.log(resp);
        const url= window.URL.createObjectURL(resp);
        window.open(url);
        // tslint:disable-next-line
      }
    } catch (error) {
      console.error(error);
    }
  }
/*
  async modifyFactura(factura){
    console.log(factura);
    const resp = await this.auth.modifyFactura(factura);
    this.presentToast(resp['mensaje']);
  }
*/
  async deleteFactura(factura){
      const resp = await this.auth.deleteFactura(factura);
      if (resp) {
        this.presentToast(resp);
      } else {
        this.presentToast(resp);
      }
      this.getFactura();
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
