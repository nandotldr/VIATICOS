import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment.prod";

@Component({
  selector: 'app-create-comision',
  templateUrl: './create-comision.page.html',
  styleUrls: ['./create-comision.page.scss','../../../app.component.scss'],
})
export class CreateComisionPage implements OnInit {
  perfil = null;
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
      private http: HttpClient
      ) 
      { 
        this.fgCreate = this.formBuilder.group({
        name: new FormControl('', [Validators.required]),
        programa: new FormControl('', [Validators.required]),
        evento: new FormControl('', [Validators.required]),
        objetivo_trabajo: new FormControl('', [Validators.required]),
        tipo_comision: new FormControl('', [Validators.required]),
        destino_com: new FormControl('', [Validators.required]),
        fecha_inicio: new FormControl('', [Validators.required]),
        fecha_fin: new FormControl('', [Validators.required]),
        justificacion: new FormControl('', [Validators.required]),
        invitacion_evento: new FormControl(null, []),
        programa_evento: new FormControl(null, []),
        });
      }

  ngOnInit() {
    this.getUsuario();  
    console.log(localStorage.getItem('id_usuario'))
  }

  async createComision(){
    if (this.fgCreate.valid) {
      const resp = await this.auth.createComision(this.fgCreate.value);
      if (resp) {
        this.presentToastSuccess();
      } else {
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
        this.presentToastSuccess();
      } else {
        this.presentToast();
      }
    
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Datos no validos.',
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

}
