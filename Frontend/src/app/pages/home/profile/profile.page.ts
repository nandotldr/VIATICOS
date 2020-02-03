import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss', '../../../app.component.scss'],
})
export class ProfilePage implements OnInit {
perfil = '';

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              public toastController: ToastController,
              private router: Router,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.getUsuario();
  }

  async getUsuario() {
    const resp = await this.auth.getUsuario(localStorage.getItem('id_usuario'));
    if (resp) {
      this.perfil = resp;
      console.log(this.perfil);
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
      message: 'Perfil correctamente cargado.',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
