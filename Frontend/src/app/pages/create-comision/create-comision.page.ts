import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-comision',
  templateUrl: './create-comision.page.html',
  styleUrls: ['./create-comision.page.scss'],
})
export class CreateComisionPage implements OnInit {
  fgRestore: FormGroup;
  fgRestoreToken: FormGroup;
  token: string;
  restoreStep = 0;

  constructor(
      private formBuilder: FormBuilder,
      private auth: AuthService,
      public toastController: ToastController,
      private router: Router
      ) 
      { 
        this.fgRestore = this.formBuilder.group({
        code: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(11)]),
        name: new FormControl('', [Validators.required]),
        area: new FormControl('', [Validators.required]),
        plaza: new FormControl('', [Validators.required]),
        tipo_com: new FormControl('', [Validators.required]),
        destino_com: new FormControl('', [Validators.required]),
        });
      }

  ngOnInit() {
  }

}
