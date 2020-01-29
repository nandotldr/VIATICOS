import {Component, OnInit} from '@angular/core';
import {JobPositionModel, PopOverItem} from '../../../interfaces/interfaces';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthServiceService} from '../../../services/auth-service.service';
import {PopoverController, ToastController} from '@ionic/angular';
import {PopConfirmationComponent} from '../../pop-confirmation/pop-confirmation.component';
import {CurriculumService} from '../../../services/curriculum.service';

@Component({
  selector: 'app-job-positions',
  templateUrl: './job-positions.component.html',
  styleUrls: ['./job-positions.component.scss'],
})
export class JobPositionsComponent implements OnInit {
  confirmationPop: PopOverItem = {
    title: 'Esta seguro?',
    information: 'Esta accion no se puede recuperar'
  };
  private jobDataForm: FormGroup;
  canEditJobs = false;
  jobData: JobPositionModel[];
  private FILE_URL: string;
  private userType: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthServiceService,
              private curriculumService: CurriculumService,
              public toastController: ToastController,
              private popoverConf: PopoverController
  ) {
    this.jobDataForm = this.formBuilder.group({
      jobs: this.formBuilder.array([
        this.getJobTemplate()
      ])
    });
  }

  async ngOnInit() {
    this.getJobsData();
  }

  /**
   * devuelve los datos de la api
   */
  async getJobsData() {
    const control = this.jobDataForm.controls.jobs as FormArray;  // necesito el control por que es un FormArray
    try {
      const resp = await this.curriculumService.getJobPositions(this.auth.codeUser).toPromise();
      this.userType = this.auth.userType;
      // @ts-ignore
      this.jobData = resp.data as JobPositionModel[];
      for (let i = 1; i < this.jobData.length; i++) {
        control.push(this.getJobTemplate());
      }
      control.patchValue(this.jobData);
    } catch (error) {
      console.error('Error en job-positions', error);
    }
  }

  /**
   * Regresa la plantilla vacia de los elementos que este Form necesita
   */
  private getJobTemplate() {
    return this.formBuilder.group({
      // TODO: validators: max length, Validator.required
      id: new FormControl(''),
      position: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
      institution: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
      period: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
      personal_code: new FormControl('')
    });
  }

  /**
   * Agrega un FormGroup con datos vacios a jobDataForm, se agrega al inicio
   */
  addJobToGroup() {
    const control = this.jobDataForm.controls.jobs as FormArray;
    control.insert(0, this.getJobTemplate());
  }

  /**
   * Crea un nuevo elemento
   * @param formData - Elemento a agregar
   */
  async addJob(formData: JobPositionModel) {
    try {
      const resp = await this.curriculumService.addJob(this.auth.codeUser, formData).toPromise();
      // @ts-ignore
      if (resp.ok) {
        this.presentToast('Trabajo creado con exito');
        this.canEditJobs = !this.canEditJobs;
        this.getJobsData();
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
  async updateJob(index: number) {
    // si es vacio significa que fue creado por el usuario, entonces agregar a la db
    if (this.jobDataForm.value.jobs[index].id === '') { // addNew
      this.addJob(this.jobDataForm.value.jobs[index]);
    } else {  // update
      // codigo para hacer el update, el valor esta en
      try {
        const formData = this.jobDataForm.value.jobs[index];
        const resp = await this.curriculumService.updateJob(this.auth.codeUser, formData).toPromise();
        console.log('post', resp);
        // @ts-ignore
        if (resp.ok) {
          this.presentToast('Trabajo modificado con exito');
          this.getJobsData();
        } else {
          // @ts-ignore
          this.presentToast(resp.message);
        }
        this.canEditJobs = !this.canEditJobs;
      } catch (error) {
        console.error('Error en curriculum', error);
      }
    }
  }

  /**
   * Elimina el dato academico
   * @param index - Elemento a ser eliminado en la db
   */
  async removeJob(index: number) {
    // si es vacio significa que fue creado por el usuario, entonces agregar a la db
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
      const id = this.jobDataForm.value.jobs[index].id;
      // si el id es vacio significa que el usuario agrego este elemento, quiza por accidente, entonces solo esta en local
      if (id === '' || id === null) {
        this.removeJobLocal(index);
      } else {
        // si no es null significa que es un elemento de la api
        try {
          const resp = await this.curriculumService.deleteJob(this.auth.codeUser, id).toPromise();
          if (resp.ok) {
            this.presentToast('Borrado con exito');
            this.removeJobLocal(index);
          } else {
            this.presentToast(resp.message);
          }
        } catch (error) {
          console.error('Error en job-positions', error);
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
  private removeJobLocal(index: number) {
    const control = this.jobDataForm.controls.jobs as FormArray;
    control.removeAt(index);
  }
}
