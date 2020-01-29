import {Component, OnInit} from '@angular/core';
import {PopOverItem} from '../../../interfaces/interfaces';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {AuthServiceService} from '../../../services/auth-service.service';
import {AdministrationService} from '../../../services/administration.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  confirmationPop: PopOverItem = {
    title: 'Esta seguro?',
    information: 'Esta accion no se puede recuperar'
  };
  private userDataForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthServiceService,
              private administrationService: AdministrationService,
              public toastController: ToastController
  ) {
    this.userDataForm = this.getUserTemplate();
  }

  async ngOnInit() {
  }


  /**
   * Crea un nuevo usuario
   * @param formData - Elemento a agregar
   */
  async addUser(formData: FormGroup) {
    try {
      const resp = await this.administrationService.addUser(this.auth.codeUser, formData.value).toPromise();
      // @ts-ignore
      if (resp.ok) {
        this.presentToast('Usuario creado con exito');
        this.clearForm();
      } else {
        // @ts-ignore
        this.presentToast(resp.message);
      }
    } catch (error) {
      console.error('Error en Create', error);
    }

  }

  /**
   * Toast que maneja los mensajes al usuario
   * @param message - Mensaje a ser mostrado
   */
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  /**
   * Este metodo crea el formGroup que sera utilizado en este componente
   * @returns FormGroup - informacion necesaria
   */
  private getUserTemplate() {
    // TODO: validators: max length
    return this.formBuilder.group({
      code: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(75)]),
      gender: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      names: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      last_name: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      second_last_name: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      ascription_dependency: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Borra los datos del formData, se llama despues de crear un usuario.
   */
  private clearForm() {
    this.userDataForm = this.getUserTemplate();
  }
}
