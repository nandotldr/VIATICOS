/* tslint:disable:no-trailing-whitespace */
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {

  fgCreate: FormGroup;

  date = new Date('yyyy-MM-dd');

  constructor(private formBuilder: FormBuilder,
              private toastController: ToastController,
              private router: Router,
              private auth: AuthService) {
    this.fgCreate = this.formBuilder.group({
      code: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(11)]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      nip: new FormControl('', [Validators.required]),
      nip2: new FormControl('', [Validators.required]),
      area_adscripcion: new FormControl('', [Validators.required]),
      plaza_laboral: new FormControl('', [Validators.required]),
      numero_social: new FormControl('', [Validators.required]),
      date: new Date
    }, {validator: CreateUserPage.passwordsMatch});
  }

  static passwordsMatch(cg: FormGroup): {[err: string]: any} {
    const nip = cg.get('nip');
    const nip2 = cg.get('nip2');
    const rv: {[error: string]: any} = {};
    if ((nip.touched || nip2.touched) && nip.value !== nip2.value) {
      rv['passwordMismatch'] = true;
    }
    return rv;
  }

  ngOnInit() {
  }

  async createUser() {
    if (this.fgCreate.valid) {
      const resp = await this.auth.createUser(this.fgCreate.value);
      if (resp) {
        this.router.navigateByUrl('/login');
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
