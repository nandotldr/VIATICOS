import {Component, OnInit} from '@angular/core';
import {PopOverItem, ProfessionalAssociationsModel} from '../../../interfaces/interfaces';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthServiceService} from '../../../services/auth-service.service';
import {CurriculumService} from '../../../services/curriculum.service';
import {PopoverController, ToastController} from '@ionic/angular';
import {PopConfirmationComponent} from '../../pop-confirmation/pop-confirmation.component';

@Component({
  selector: 'app-associations',
  templateUrl: './associations.component.html',
  styleUrls: ['./associations.component.scss'],
})
export class AssociationsComponent implements OnInit {
  confirmationPop: PopOverItem = {
    title: 'Esta seguro?',
    information: 'Esta accion no se puede recuperar'
  };
  private associationDataForm: FormGroup;
  canEditAssociations = false;
  associationData: ProfessionalAssociationsModel[];
  private userType: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthServiceService,
              private curriculumService: CurriculumService,
              public toastController: ToastController,
              private popoverConf: PopoverController
  ) {
    this.associationDataForm = this.formBuilder.group({
      associations: this.formBuilder.array([
        this.getAssociationTemplate()
      ])
    });
  }

  async ngOnInit() {
    this.getAssociationsData();
  }

  /**
   * devuelve los datos de la api
   */
  async getAssociationsData() {
    const control = this.associationDataForm.controls.associations as FormArray;  // necesito el control por que es un FormArray
    try {
      const resp = await this.curriculumService.getAssociationsData(this.auth.codeUser).toPromise();
      this.userType = this.auth.userType;
      // @ts-ignore
      this.associationData = resp.data as ProfessionalAssociationsModel[];
      for (let i = 1; i < this.associationData.length; i++) {
        control.push(this.getAssociationTemplate());
      }
      control.patchValue(this.associationData);
    } catch (error) {
      console.error('Error en academic data', error);
    }
  }

  /**
   * Regresa la plantilla vacia de los elementos que este Form necesita
   */
  private getAssociationTemplate() {
    return this.formBuilder.group({
      // TODO: validators: max length, Validator.required
      id: new FormControl(''),
      association_name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
      membership_type: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
      period: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
      personal_code: new FormControl('')
    });
  }

  /**
   * Agrega un FormGroup con datos vacios a associationDataForm, se agrega al inicio
   */
  addAssociationToGroup() {
    const control = this.associationDataForm.controls.associations as FormArray;
    control.insert(0, this.getAssociationTemplate());
  }

  /**
   * Crea un nuevo elemento academico
   * @param formData - Elemento a agregar
   */
  async addAssociation(formData: ProfessionalAssociationsModel) {
    try {
      const resp = await this.curriculumService.addAssociation(this.auth.codeUser, formData).toPromise();
      console.log('post', resp);
      // @ts-ignore
      if (resp.ok) {
        this.presentToast('Trabajo creado con exito');
        this.canEditAssociations = !this.canEditAssociations;
        this.getAssociationsData();
      } else {
        // @ts-ignore
        this.presentToast(resp.message);
      }
    } catch (error) {
      console.error('Error en curriculum', error);
    }

  }

  /**
   * Actualiza el Dato Academico en el index dado
   * @param index - Elemento a actualizar
   */
  async updateAssociation(index: number) {
    // si es vacio significa que fue creado por el usuario, entonces agregar a la db
    if (this.associationDataForm.value.associations[index].id === '') { // addNew
      this.addAssociation(this.associationDataForm.value.associations[index]);
    } else {  // update
      // codigo para hacer el update
      try {
        const formData = this.associationDataForm.value.associations[index];
        const resp = await this.curriculumService.updateAssociation(this.auth.codeUser, formData).toPromise();
        // @ts-ignore
        if (resp.ok) {
          this.presentToast('Trabajo modificado con exito');
          this.getAssociationsData();
        } else {
          // @ts-ignore
          this.presentToast(resp.message);
        }
        this.canEditAssociations = !this.canEditAssociations;
      } catch (error) {
        console.error('Error en curriculum', error);
      }
    }
  }

  /**
   * Elimina el dato academico
   * @param index - Elemento a ser eliminado en la db
   */
  async removeAssociation(index: number) {
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
      const id = this.associationDataForm.value.associations[index].id;
      console.log(id);
      // si el id es vacio significa que el usuario agrego este elemento, quiza por accidente, entonces solo esta en local
      if (id === '' || id === null) {
        this.removeAssociationLocal(index);
      } else {
        // si no es null significa que es un elemento de la api
        try {
          const resp = await this.curriculumService.deleteAssociation(this.auth.codeUser, id).toPromise();
          if (resp.ok) {
            this.presentToast('Borrado con exito');
            this.removeAssociationLocal(index);
          } else {
            this.presentToast(resp.message);
          }
        } catch (error) {
          console.error('Error en associations', error());
        }
      }
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
   * Elimina el FormGroup del elemento especificado de forma local
   * @param index - Elemento a ser eliminado
   */
  private removeAssociationLocal(index: number) {
    const control = this.associationDataForm.controls.associations as FormArray;
    control.removeAt(index);
  }
}
