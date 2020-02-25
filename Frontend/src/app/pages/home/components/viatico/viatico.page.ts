import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastController, NavParams, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-viatico',
  templateUrl: './viatico.page.html',
  styleUrls: ['./viatico.page.scss', '../../../../app.component.scss'],
})
export class ViaticoPage implements OnInit {

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
          nombre_invitado: new FormControl('', [Validators.required]),
          comentarios: new FormControl('', [Validators.required]),
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

  async saveViatico(){
    if (this.fgCreate.valid) {
      console.log(this.fgCreate.value);
      const resp = await this.auth.saveViatico(this.fgCreate.value).toPromise();
      if (resp) {
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
      header: 'Viatico Creado',
      // subHeader: 'Subtitle',
      message: 'Tu viático fue registrado, consulta la página "Lista de Viáticos" para agregar tus gastos por día.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
