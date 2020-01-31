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
  styleUrls: ['./create-comision.page.scss'],
})
export class CreateComisionPage implements OnInit {
  fgRestore: FormGroup;
  fgRestoreToken: FormGroup;
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
        this.fgRestore = this.formBuilder.group({
        code: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(11)]),
        name: new FormControl('', [Validators.required]),
        area: new FormControl('', [Validators.required]),
        plaza: new FormControl('', [Validators.required]),
        tipo_comision: new FormControl('', [Validators.required]),
        destino_com: new FormControl('', [Validators.required]),
        fecha_inicio: new FormControl('', [Validators.required]),
        fecha_fin: new FormControl('', [Validators.required]),
        invitacion_evento: new FormControl(null, []),
        programa_evento: new FormControl(null, []),
        });
      }

  ngOnInit() {

  }

  async createComision(){
    
  }

}
