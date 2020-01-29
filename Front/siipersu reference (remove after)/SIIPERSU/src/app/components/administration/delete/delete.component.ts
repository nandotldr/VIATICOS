import {Component, OnInit} from '@angular/core';
import {PopOverItem} from '../../../interfaces/interfaces';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {AuthServiceService} from '../../../services/auth-service.service';
import {AdministrationService} from '../../../services/administration.service';
import {PopoverController, ToastController} from '@ionic/angular';
import {PopConfirmationComponent} from '../../pop-confirmation/pop-confirmation.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  confirmationPop: PopOverItem = {
    title: 'Esta seguro?',
    information: 'Esta accion no se puede recuperar'
  };
  private userDataForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthServiceService,
              private administrationService: AdministrationService,
              public toastController: ToastController,
              private popoverConf: PopoverController
  ) {
    this.userDataForm = this.getUserTemplate();
  }

  async ngOnInit() {
  }


  /**
   * Elimina al usuario
   * @param formData - Elemento a eliminar
   */
  async deleteUser(formData: FormGroup) {
    try {
      // esto llama a un popover para confirmar la eliminacion del usuario
      const popOver = await this.popoverConf.create({
        component: PopConfirmationComponent,
        componentProps: {confirmationPop: this.confirmationPop},
        backdropDismiss: false,
      });
      await popOver.present();
      const {data} = await popOver.onDidDismiss();
      const isDeletable = data.canDo;
      // si el usuario elige que simon:
      if (isDeletable) {
        const resp = await this.administrationService.deleteUser(this.auth.codeUser, formData.value.code).toPromise();
        // @ts-ignore
        if (resp.ok) {
          this.presentToast('Usuario borrado con exito');
          this.clearForm();
        } else {
          // @ts-ignore
          this.presentToast(resp.message);
        }
      }
    } catch (error) {
      console.error('Error en delete', error);
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
    return this.formBuilder.group({
      // TODO: validators: max length
      code: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    });
  }

  /**
   * Borra los datos del formData, se llama despues de eliminar un usuario.
   */
  private clearForm() {
    this.userDataForm = this.getUserTemplate();
  }
}
