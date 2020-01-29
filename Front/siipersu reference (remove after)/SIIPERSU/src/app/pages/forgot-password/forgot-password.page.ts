import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {ToastController} from '@ionic/angular';
import {AuthServiceService} from '../../services/auth-service.service';
import {RestorePasswordModel} from '../../interfaces/interfaces';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  fgRestore: FormGroup;
  fgRestoreToken: FormGroup;
  token: string;
  restoreStep = 0;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthServiceService,
              public toastController: ToastController,
              private router: Router
  ) {
    this.fgRestore = this.formBuilder.group({
      code: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      rfc: new FormControl('', [Validators.required]),
      imss: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
    });
    this.fgRestoreToken = this.formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(75)]),
      token: new FormControl(''),
    });
  }

  ngOnInit() {
  }

  async restorePassword() {
    try {
      let data = {...this.fgRestore.value} as RestorePasswordModel;
      data.birthday = new Date(data.birthday).toJSON().slice(0, 10);
      const resp = await this.auth.restorePassword(data).toPromise();
      // @ts-ignore
      if (resp.ok) {
        // @ts-ignore
        this.token = resp.data.changeToken;
        this.restoreStep++;
      } else {
        this.presentToast('Datos no validos.');
      }
    } catch (error) {
      console.error('Error en restore-password', error);
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async LogIn() {
    try {
      this.fgRestoreToken.value.token = this.token;
      const resp = await this.auth.changePassword(this.fgRestoreToken.value).toPromise();
      // @ts-ignore
      if (resp.ok) {
        this.presentToast('Cambio de contraseña exitosa, por favor inicia sesion');
        this.router.navigateByUrl('/login');
      } else {
        // @ts-ignore
        this.presentToast(resp.message);
      }
    } catch (error) {
      console.error('Error en restore-password', error);
    }
  }
}
