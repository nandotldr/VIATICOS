import {Component, OnInit} from '@angular/core';
import {ProfessionalExperiencesModel, PopOverItem} from '../../../interfaces/interfaces';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthServiceService} from '../../../services/auth-service.service';
import {CurriculumService} from '../../../services/curriculum.service';
import {PopoverController, ToastController} from '@ionic/angular';
import {PopConfirmationComponent} from '../../pop-confirmation/pop-confirmation.component';

@Component({
  selector: 'app-professional-experiences',
  templateUrl: './professional-experiences.component.html',
  styleUrls: ['./professional-experiences.component.scss'],
})
export class ProfessionalExperiencesComponent implements OnInit {
  confirmationPop: PopOverItem = {
    title: 'Esta seguro?',
    information: 'Esta accion no se puede recuperar'
  };
  private experienceDataForm: FormGroup;
  canEditExperiences = false;
  experienceData: ProfessionalExperiencesModel[];
  private userType: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthServiceService,
              private curriculumService: CurriculumService,
              public toastController: ToastController,
              private popoverConf: PopoverController
  ) {
    this.experienceDataForm = this.formBuilder.group({
      experiences: this.formBuilder.array([
        this.getExperienceTemplate()
      ])
    });
  }

  async ngOnInit() {
    this.getExperiencesData();
  }

  /**
   * devuelve los datos de la api
   */
  async getExperiencesData() {
    const control = this.experienceDataForm.controls.experiences as FormArray;  // necesito el control por que es un FormArray
    try {
      const resp = await this.curriculumService.getExperiencesData(this.auth.codeUser).toPromise();
      this.userType = this.auth.userType;
      // @ts-ignore
      this.experienceData = resp.data as ProfessionalExperiencesModel[];
      for (let i = 1; i < this.experienceData.length; i++) {
        control.push(this.getExperienceTemplate());
      }
      control.patchValue(this.experienceData);
    } catch (error) {
      console.error('Error en professional-experience', error);
    }
  }

  /**
   * Regresa la plantilla vacia de los elementos que este Form necesita
   */
  private getExperienceTemplate() {
    return this.formBuilder.group({
      // TODO: validators: max length, Validator.required
      id: new FormControl(''),
      position: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
      company: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
      period: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
      personal_code: new FormControl('')
    });
  }

  /**
   * Agrega un FormGroup con datos vacios a experienceDataForm, se agrega al inicio
   */
  addExperienceToGroup() {
    const control = this.experienceDataForm.controls.experiences as FormArray;
    control.insert(0, this.getExperienceTemplate());
  }

  /**
   * Crea un nuevo elemento academico
   * @param formData - Elemento a agregar
   */
  async addExperience(formData: ProfessionalExperiencesModel) {
    try {
      const resp = await this.curriculumService.addExperience(this.auth.codeUser, formData).toPromise();
      // @ts-ignore
      if (resp.ok) {
        this.presentToast('Creado con exito');
        this.canEditExperiences = !this.canEditExperiences;
        this.getExperiencesData();
      } else {
        // @ts-ignore
        this.presentToast(resp.message);
      }
    } catch (error) {
      console.error('Error en professional-experience', error);
    }

  }

  /**
   * Actualiza el Dato Academico en el index dado
   * @param index - Elemento a actualizar
   */
  async updateExperience(index: number) {
    // si es vacio significa que fue creado por el usuario, entonces agregar a la db
    if (this.experienceDataForm.value.experiences[index].id === '') { // addNew
      this.addExperience(this.experienceDataForm.value.experiences[index]);
    } else {  // update
      // codigo para hacer el update, el valor esta en
      try {
        const formData = this.experienceDataForm.value.experiences[index];
        const resp = await this.curriculumService.updateExperience(this.auth.codeUser, formData).toPromise();
        // @ts-ignore
        if (resp.ok) {
          this.presentToast('Modificado con exito');
          this.getExperiencesData();
        } else {
          // @ts-ignore
          this.presentToast(resp.message);
        }
        this.canEditExperiences = !this.canEditExperiences;
      } catch (error) {
        console.error('Error en professional-experience', error);
      }
    }
  }

  /**
   * Elimina el dato academico
   * @param index - Elemento a ser eliminado en la db
   */
  async removeExperience(index: number) {
    const popOver = await this.popoverConf.create({
      component: PopConfirmationComponent,
      componentProps: {confirmationPop: this.confirmationPop},
      backdropDismiss: false,
    });
    await popOver.present();
    const {data} = await popOver.onDidDismiss();
    const isDeletable = data.canDo;
    if (isDeletable) {
      const id = this.experienceDataForm.value.experiences[index].id;
      // si el id es vacio significa que el usuario agrego este elemento, quiza por accidente, entonces solo esta en local
      if (id === '' || id === null) {
        this.removeExperienceLocal(index);
      } else {
        // si no es null significa que es un elemento de la api
        try {
          const resp = await this.curriculumService.deleteExperience(this.auth.codeUser, id).toPromise();
          if (resp.ok) {
            this.presentToast('Borrado con exito');
            this.removeExperienceLocal(index);
          } else {
            this.presentToast(resp.message);
          }
        } catch (error) {
          console.error('Error en professional-experience', error);
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
  private removeExperienceLocal(index: number) {
    const control = this.experienceDataForm.controls.experiences as FormArray;
    control.removeAt(index);
  }
}
