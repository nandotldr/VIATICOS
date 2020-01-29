import { Component, OnInit } from '@angular/core';
import {AcademicSubjectsModel, PopOverItem} from '../../../interfaces/interfaces';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthServiceService} from '../../../services/auth-service.service';
import {CurriculumService} from '../../../services/curriculum.service';
import {PopoverController, ToastController} from '@ionic/angular';
import {PopConfirmationComponent} from '../../pop-confirmation/pop-confirmation.component';

@Component({
  selector: 'app-academic-subject',
  templateUrl: './academic-subject.component.html',
  styleUrls: ['./academic-subject.component.scss'],
})
export class AcademicSubjectComponent implements OnInit {
  confirmationPop: PopOverItem = {
    title: 'Esta seguro?',
    information: 'Esta accion no se puede recuperar'
  };
  private subjectDataForm: FormGroup;
  canEditSubjects = false;
  subjectData: AcademicSubjectsModel[];
  private userType: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthServiceService,
              private curriculumService: CurriculumService,
              public toastController: ToastController,
              private popoverConf: PopoverController
  ) {
    this.subjectDataForm = this.formBuilder.group({
      subjects: this.formBuilder.array([
        this.getSubjectTemplate()
      ])
    });
  }

  async ngOnInit() {
    this.getSubjectsData();
  }

  /**
   * devuelve los datos de la api
   */
  async getSubjectsData() {
    const control = this.subjectDataForm.controls.subjects as FormArray;  // necesito el control por que es un FormArray
    try {
      const resp = await this.curriculumService.getSubjectsData(this.auth.codeUser).toPromise();
      this.userType = this.auth.userType;
      // @ts-ignore
      this.subjectData = resp.data as AcademicSubjectsModel[];
      // este for es necesario para poder hacer el patch al arreglo despues, igualo en la cantidad de elementos ambos arreglos
      for (let i = 1; i < this.subjectData.length; i++) {
        control.push(this.getSubjectTemplate());
      }
      control.patchValue(this.subjectData);
    } catch (error) {
      console.error('Error en academic data', error);
    }
  }

  /**
   * Este metodo crea el formGroup que sera utilizado en este componente
   * @returns FormGroup - informacion necesaria
   */
  private getSubjectTemplate() {
    return this.formBuilder.group({
      id: new FormControl(''),
      subject: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      number_sections: new FormControl('', [Validators.required]),
      period: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      personal_code: new FormControl('', [Validators.required])
    });
  }

  /**
   * Agrega un FormGroup con datos vacios a subjectDataForm, se agrega al inicio
   */
  addSubjectToGroup() {
    const control = this.subjectDataForm.controls.subjects as FormArray;
    control.insert(0, this.getSubjectTemplate());
  }

  /**
   * Crea un nuevo elemento academico
   * @param formData - Elemento a agregar
   */
  async addSubject(formData: AcademicSubjectsModel) {
    try {
      const resp = await this.curriculumService.addSubject(this.auth.codeUser, formData).toPromise();
      console.log('post', resp);
      // @ts-ignore
      if (resp.ok) {
        this.presentToast('Trabajo creado con exito');
        this.canEditSubjects = !this.canEditSubjects;
        this.getSubjectsData();
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
  async updateSubject(index: number) {
    // si es vacio significa que fue creado por el usuario, entonces agregar nuevo a la db
    if (this.subjectDataForm.value.subjects[index].id === '') { // addNew
      this.addSubject(this.subjectDataForm.value.subjects[index]);
    } else {  // update
      // codigo para hacer el update, el valor esta en
      try {
        const formData = this.subjectDataForm.value.subjects[index];
        const resp = await this.curriculumService.updateSubject(this.auth.codeUser, formData).toPromise();
        console.log('post', resp);
        // @ts-ignore
        if (resp.ok) {
          this.presentToast('Trabajo modificado con exito');
          this.getSubjectsData();
        } else {
          // @ts-ignore
          this.presentToast(resp.message);
        }
        this.canEditSubjects = !this.canEditSubjects;
      } catch (error) {
        console.error('Error en curriculum', error);
      }
    }
  }

  /**
   * Elimina el dato academico
   * @param index - Elemento a ser eliminado en la db
   */
  async removeSubject(index: number) {
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
      const id = this.subjectDataForm.value.subjects[index].id;
      // si el id es vacio significa que el usuario agrego este elemento, quiza por accidente, entonces solo esta en local
      if (id === '' || id === null) {
        this.removeSubjectLocal(index);
      } else {
        // si no es null significa que es un elemento de la api
        try {
          const resp = await this.curriculumService.deleteSubject(this.auth.codeUser, id).toPromise();
          if (resp.ok) {
            this.presentToast('Borrado con exito');
            this.removeSubjectLocal(index);
          } else {
            this.presentToast(resp.message);
          }
        } catch (error) {
          console.error('Error en academic subject', error);
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
  private removeSubjectLocal(index: number) {
    const control = this.subjectDataForm.controls.subjects as FormArray;
    control.removeAt(index);
  }
}
