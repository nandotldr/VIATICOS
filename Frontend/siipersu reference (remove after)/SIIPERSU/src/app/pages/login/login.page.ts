import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';
import {AuthServiceService} from '../../services/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  fgLogin: FormGroup;

  constructor(
    private auth: AuthServiceService,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private router: Router) {
    this.fgLogin = this.formBuilder.group({
      code: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
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
