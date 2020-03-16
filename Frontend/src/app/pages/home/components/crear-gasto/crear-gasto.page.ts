import { ToastController, ModalController, NavParams, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-crear-gasto',
  templateUrl: './crear-gasto.page.html',
  styleUrls: ['./crear-gasto.page.scss'],
})
export class CrearGastoPage implements OnInit {

  idViatico: Number;
  fgGasto: FormGroup;
  myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public toast: ToastController,
    private modalController: ModalController,
    private navParams: NavParams,
    public alertController: AlertController
  ) {

    this.idViatico = this.navParams.get('id_viatico');

    this.fgGasto = this.formBuilder.group({
      id_solicitud_viatico: new FormControl(this.idViatico, []),
      dia: new FormControl(this.myDate, []),
      rubro: new FormControl('',[Validators.required]),
      cantidad: new FormControl('',[Validators.required]),
      proyecto: new FormControl('',[Validators.required]),
      estatus: new FormControl(0,[])
    });
  }

  ngOnInit() {
    this.idViatico = this.navParams.get('id_viatico');
  }

  async createGasto(){
    console.log(this.fgGasto.value);
    if (this.fgGasto.valid){
      const resp = await this.auth.createGasto(this.fgGasto.value).toPromise();
      if (resp) {
        console.log(resp);
        this.presentToast('Gastos creados');
        // PUT en Viatico para cambiar el status
        this.presentAlertCreado();
      } else {
        this.presentToast(resp);
      }
    } else {
      this.presentToast('Por favor llena todos los campos');
    }

  }

  async presentToast(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async presentAlertCreado() {
    const alert = await this.alertController.create({
      header: 'Gasto Creado',
      // subHeader: 'Subtitle',
      message: 'Agrega otro gasto o accede a "Info" para confirmar tus gastos',
      buttons: ['OK']
    });

    await alert.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
