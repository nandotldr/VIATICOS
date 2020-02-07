import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-informe',
  templateUrl: './crear-informe.page.html',
  styleUrls: ['./crear-informe.page.scss'],
})
export class CrearInformePage implements OnInit {
  informeGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public toastController: ToastController,
    private modalController: ModalController,
    private router: Router,
    private http: HttpClient) {
      this.informeGroup = this.formBuilder.group({
        invitado: new FormControl(''),
        comentarios: new FormControl(''),
        status: new FormControl('')
      });
     }

  ngOnInit() {
  }

}
