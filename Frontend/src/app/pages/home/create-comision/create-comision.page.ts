import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { formatDate } from '@angular/common';
import { ProgramPage } from '../components/program/program.page';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-create-comision',
  templateUrl: './create-comision.page.html',
  styleUrls: ['./create-comision.page.scss', '../../../app.component.scss'],
})
export class CreateComisionPage implements OnInit {
  flagtipoc: Number;
  destinos = '';
  programa: File;
  invitacion: File;
  id: {id_comision: Number};
  data: {id: Number,file: File};
  perfil = '';
  id_filtro = '';
  id_destino: Number;
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
      public alertController: AlertController,
      private modalController: ModalController
      ) {

        this.fgCreate = this.formBuilder.group({
        tipo_comision: new FormControl('', [Validators.required]),
        destino_com: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        objetivo_trabajo: new FormControl('', [Validators.required]),
        justificacion: new FormControl('', [Validators.required]),
        fecha_inicio: new FormControl('', [Validators.required]),
        fecha_fin: new FormControl('', [Validators.required]),
        programa: new FormControl('', []),
        invitacion: new FormControl('', []),
        });
      }

  ngOnInit() {
    this.getUsuario();
    
  }

  async createComision() {
    if (this.fgCreate.valid) {
      const resp = await this.auth.createComision(this.fgCreate.value);
      if (resp['ok']) {
        this.presentToast(resp['mensaje']);
        this.id = resp['body'];
        this.data = {id: this.id.id_comision ,file: this.programa};
        this.uploadPrograma(this.data);
        this.data = {id: this.id.id_comision ,file: this.invitacion};
        this.uploadInvitacion(this.data);
        this.presentAlert();
      } else {
        console.log(resp);
        this.presentToast(resp['mensaje']);
      }
    } else {
      this.presentToast('Llena los campos');
    }
  }

  async getUsuario() {
    const resp = await this.auth.getUsuario(localStorage.getItem('id_usuario'));
    if (resp) {
      this.perfil = resp;
      console.log(this.perfil);
    } else {
      this.presentToast(resp.mensaje);
    }
  }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async presentToastSuccess() {
    const toast = await this.toastController.create({
      message: 'Solicitud Creada.',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async openModal() {
    const modal: HTMLIonModalElement =
       await this.modalController.create({
          component: ProgramPage,
          componentProps: {
            id_comision: this.id_comision,
          }
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
       if (detail !== null) {
         console.log('The result:', detail.data);
       }
    });

    await modal.present();
  }

  popSelect(flag) {
    this.flagtipoc = flag;
  }

  async getDestinos(id_filtro) {
      const resp = await this.auth.getDestinos(this.fgCreate.controls.tipo_comision.value, id_filtro);
      console.log(resp['body']);
      if (resp['ok']) {
        this.destinos = resp['body'];
        this.presentToast(resp['mensaje']);
      } else {
        console.log(resp);
        this.presentToast(resp['mensaje']);
      }
  }

  async popDestinos(event: any) {
    this.id_filtro = event.target.value;
    this.getDestinos(this.id_filtro);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Comisión Guardada',
      // subHeader: 'Subtitle',
      message: 'Revisa tu comisión en el menú de la izquierda "Lista de Comisiones" y agrega un programa.',
      buttons: ['OK']
    });

    await alert.present();
  }

  getInvitacion(event){
    this.invitacion = event.target.files[0];
    console.log(this.invitacion);
  }

  getPrograma(event){
    this.programa = event.target.files[0];
    console.log(this.programa);
  }

  async uploadPrograma(data: {id: Number, file: File }){
    const resp = await this.auth.uploadPrograma(data);
    console.log(resp);
    // if (resp['ok']) {
    //   this.presentToast(resp['mensaje']);
    //   this.presentAlert();
    // } else {
    //   console.log(resp);
    //   this.presentToast(resp['mensaje']);
    // }
  }

  async uploadInvitacion(data: {id: Number, file: File }){
    const resp = await this.auth.uploadInvitacion(data);
    console.log(resp);
    // if (resp['ok']) {
    //   this.presentToast(resp['mensaje']);
    //   this.presentAlert();
    // } else {
    //   console.log(resp);
    //   this.presentToast(resp['mensaje']);
    // }
  }
}
