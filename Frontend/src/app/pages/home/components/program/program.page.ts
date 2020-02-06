import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController, NavParams} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-program',
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss','../../../../app.component.scss'],
})
export class ProgramPage implements OnInit {
  perfil = '';
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
      private modalController: ModalController
      ) 
      { 
        this.fgCreate = this.formBuilder.group({
          dia: new FormControl('', [Validators.required]),
          lugar_estancia: new FormControl('', [Validators.required]),
          tareas_realizar: new FormControl('', [Validators.required]),
        });
      }

  ngOnInit() {
    this.getUsuario();  
    console.log(localStorage.getItem('id_usuario'));
  }

  async createPrograma(){
    if (this.fgCreate.valid) {
      console.log(this.fgCreate.value);
      const resp = await this.auth.createPrograma(this.fgCreate.value);
      if (resp) {
        this.presentToastSuccess();
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

}
