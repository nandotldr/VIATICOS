import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  fgLogin: FormGroup;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private router: Router) {
    this.fgLogin = this.formBuilder.group({
      code: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(1)]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  async login() {
    if (this.fgLogin.valid) {
      const resp = await this.auth.login(this.fgLogin.value);
      if (resp) {
        this.router.navigateByUrl('/home');
      } else {
        this.presentToast();
      }
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
}
