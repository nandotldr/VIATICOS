import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {

  fgCreate: FormGroup;
  


  constructor(private formBuilder: FormBuilder,
              private toastController: ToastController,
              private router: Router) 
  { 
    this.fgCreate = this.formBuilder.group({
      code: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(11)]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      nip: new FormControl('', [Validators.required]),
      area_adscripcion: new FormControl('', [Validators.required]),
      plaza_laboral: new FormControl('', [Validators.required]),
      numero_social: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  async createUser(){
    //Crear usuario en la BD con la API
  }

}
