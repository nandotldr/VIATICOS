import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ToastController, NavParams, ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-viatico',
  templateUrl: './viatico.page.html',
  styleUrls: ['./viatico.page.scss', '../../../../app.component.scss'],
})
export class ViaticoPage implements OnInit {

  perfil = '';
  flag: Number;
  disabled: Boolean = true;
  programa: any;
  id_comision: Number;
  fgCreate: FormGroup;
  token: string;
  restoreStep = 0;
  myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  fecha_inicio = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  fecha_fin = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor(
      private formBuilder: FormBuilder,
      private auth: AuthService,
      public toastController: ToastController,
      private modalController: ModalController,
      private NavParams: NavParams,
      public  alertController: AlertController
      )
      {
        this.ionViewWillEnter();
        this.fgCreate = this.formBuilder.group({
          invitado_nombre: new FormControl('', []),
          comentarios: new FormControl('', []),
          id_comision: new FormControl(this.id_comision, [])
        });
      }

  ngOnInit() {
    this.getUsuario();
    console.log(localStorage.getItem('id_usuario'));
  }

  ionViewWillEnter() {
    this.id_comision = this.NavParams.get('id_comision');
    console.log('id_comision', this.id_comision);
  }

  async getProgramaComision() {
    const resp = await this.auth.getProgramaComision(this.id_comision);
    if (resp) {
        resp.forEach(element => {
          element.fecha_solicitud = formatDate(element.fecha_solicitud, 'yyyy-MM-dd', 'en');
        });
        this.programa = resp;
        console.log(this.programa);
        this.presentToastSuccess();
      } else {
        this.presentToast();
      }
  }

  async saveViatico() {
    if (this.fgCreate.valid) {
      console.log(this.fgCreate.value);
      const resp = await this.auth.saveViatico(this.fgCreate.value).toPromise();
      if (resp['ok']) {
        console.log(resp);
        // this.presentToastSuccess();
        this.presentAlert();
        this.closeModal();
      } else {
        console.log(resp);
        this.presentToast();
      }
    } else {
      this.presentToast();
    }
  }

  async getUsuario() {
      const resp = await this.auth.getUsuario(localStorage.getItem('id_usuario'));
      if (resp) {
        this.perfil = resp;
      } else {
        this.presentToast();
      }
  }

  async habilitarSend() {
    if (this.flag === 0) {
      if (this.fgCreate.get('comentarios').value != '') {
        console.log('Empleado Boton Hab');
        this.disabled = false;
      } else {
        console.log('Empleado Boton Inhab');
        this.disabled = true;
      }
    } else {
      if ((this.fgCreate.get('comentarios').value != '') && (this.fgCreate.get('invitado_nombre').value != '')) {
        console.log('Invitado Boton Hab');
        this.disabled = false;
      } else {
        console.log('Invitado Boton Inhab');
        this.disabled = true;
      }
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Esta comision ya tiene una solicitud de viatico en proceso',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async presentToastSuccess() {
    const toast = await this.toastController.create({
      message: 'Solicitud Creada.',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Viatico Creado',
      // subHeader: 'Subtitle',
      message: 'Tu viático fue registrado, consulta la página "Lista de Viáticos" para agregar tus gastos por día.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
