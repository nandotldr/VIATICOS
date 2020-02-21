import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastController, NavParams, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-program',
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss', '../../../../app.component.scss'],
})
export class ProgramPage implements OnInit {
  perfil = '';
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
      private router: Router,
      private http: HttpClient,
      private modalController: ModalController,
      private NavParams: NavParams,
      public  alertController: AlertController
      )
      {
        this.ionViewWillEnter();
        this.fgCreate = this.formBuilder.group({
          dia: new FormControl('', [Validators.required]),
          lugar_estancia: new FormControl('', [Validators.required]),
          tareas_realizar: new FormControl('', [Validators.required]),
          id_comision: new FormControl(this.id_comision,[])
        });
      } 

  ngOnInit() {
    this.getUsuario();  
    console.log(localStorage.getItem('id_usuario'));
  }

  ionViewWillEnter() {
    this.id_comision = this.NavParams.get('id_comision');
    console.log('id_comision',this.id_comision);
  }

  async getProgramaComision(){
    const resp = await this.auth.getProgramaComision(this.id_comision);
    if (resp) {
        resp.forEach(element => {
          element.fecha_solicitud = formatDate(element.fecha_solicitud, 'yyyy-MM-dd', 'en');
        });
        this.programa = resp;
        console.log(this.programa);
        this.presentToastSuccess()
      } else {
        this.presentToast();
      }
  }

  async createPrograma(){
    if (this.fgCreate.valid) {
      console.log(this.fgCreate.value);
      const resp = await this.auth.createPrograma(this.fgCreate.value);
      if (resp) {
        // this.presentToastSuccess();
        this.presentAlert();
      } else {
        console.log(resp);
        this.presentToast();
      }
    } else {
      this.presentToast();
    }
  }

  async getUsuario(){
      const resp = await this.auth.getUsuario(localStorage.getItem('id_usuario'));
      if (resp) {
        this.perfil = resp;
      } else {
        this.presentToast();
      }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Datos no Validos',
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
      header: 'Programa Creado',
      // subHeader: 'Subtitle',
      message: 'Tu actividad fue registrada, revisa tu programa en el botón "Más información".',
      buttons: ['OK']
    });

    await alert.present();
  }


}
