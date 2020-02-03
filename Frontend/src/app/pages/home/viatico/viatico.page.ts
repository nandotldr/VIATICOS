import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-viatico',
  templateUrl: './viatico.page.html',
  styleUrls: ['./viatico.page.scss','../../../app.component.scss'],
})
export class ViaticoPage implements OnInit {

  perfil = '';
  fgCreate: FormGroup;
  fgGasto: FormGroup;
  token: string;
  myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    public toastController: ToastController,
    private http: HttpClient
    ) {
      this.fgCreate = this.formBuilder.group({
        invitado_nombre: new FormControl('', []),
        comentarios: new FormControl('', [])
      });

      this.fgGasto = this.formBuilder.group({
        id_solicitud_viatico: new FormControl('', [Validators.required]),
        dia: new FormControl('', [Validators.required]),
        alimentacion: new FormControl('', [Validators.required]),
        hospedaje: new FormControl('', [Validators.required]),
        transporteLocal: new FormControl('', [Validators.required]),
        transporteForaneo: new FormControl('', [Validators.required]),
        combustible: new FormControl('', [Validators.required]),
        otros: new FormControl('', [Validators.required])
      });
    }

  ngOnInit() {
  }

  async saveViatico(){
    if (this.fgCreate.valid) {
      const resp = await this.auth.saveViatico(this.fgCreate.value);
      if (resp.ok) {
        this.presentToast('Guardado correctamente');
      } else {
        this.presentToast(resp.mensaje);
      }
    } else {
      this.presentToast('Datos no Validos');
    }
  }

  async createGasto(){
    if(this.fgGasto.valid){
      const resp = await this.auth.createGasto(this.fgGasto.value);
      if(resp.ok){
        this.presentToast('Gastos creados');
      }
      else{
        this.presentToast(resp.mensaje);
      }
    } else{
      this.presentToast('Datos no válidos. Llena los datos completos.');
    }
  }

  async getUsuario(){
    const resp = await this.auth.getUsuario(localStorage.getItem('id_usuario'));
    if (resp) {
      this.perfil = resp;
    } else {
      this.presentToast('Datos no Validos');
    }
  
  }


  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
