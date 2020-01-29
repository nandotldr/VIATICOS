import {Component, OnInit} from '@angular/core';
import {AwardModel, PopOverItem} from '../../../interfaces/interfaces';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthServiceService} from '../../../services/auth-service.service';
import {CurriculumService} from '../../../services/curriculum.service';
import {PopoverController, ToastController} from '@ionic/angular';
import {PopConfirmationComponent} from '../../pop-confirmation/pop-confirmation.component';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss'],
})
export class AwardsComponent implements OnInit {
  confirmationPop: PopOverItem = {
    title: 'Esta seguro?',
    information: 'Esta accion no se puede recuperar'
  };
  private awardDataForm: FormGroup;
  canEditAwards = false;
  awardData: AwardModel[];
  private userType: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthServiceService,
              private curriculumService: CurriculumService,
              public toastController: ToastController,
              private popoverConf: PopoverController
  ) {
    this.awardDataForm = this.formBuilder.group({
      awards: this.formBuilder.array([
        this.getAwardTemplate()
      ])
    });
  }

  async ngOnInit() {
    this.getAwardsData();
  }

  /**
   * devuelve los datos de la api
   */
  async getAwardsData() {
    const control = this.awardDataForm.controls.awards as FormArray;  // necesito el control por que es un FormArray
    try {
      const resp = await this.curriculumService.getAwardsData(this.auth.codeUser).toPromise();
      this.userType = this.auth.userType;
      // @ts-ignore
      this.awardData = resp.data as ProfessionalAwardsModel[];
      for (let i = 1; i < this.awardData.length; i++) {
        control.push(this.getAwardTemplate());
      }
      control.patchValue(this.awardData);
    } catch (error) {
      console.error('Error en academic data', error);
    }
  }

  /**
   * Regresa la plantilla vacia de los elementos que este Form necesita
   */
  private getAwardTemplate() {
    return this.formBuilder.group({
      // TODO: validators: max length, Validator.required
      id: new FormControl(''),
      award: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
      personal_code: new FormControl('')
    });
  }

  /**
   * Agrega un FormGroup con datos vacios a awardDataForm, se agrega al inicio
   */
  addAwardToGroup() {
    const control = this.awardDataForm.controls.awards as FormArray;
    control.insert(0, this.getAwardTemplate());
  }

  /**
   * Crea un nuevo elemento academico
   * @param formData - Elemento a agregar
   */
  async addAward(formData: AwardModel) {
    try {
      const resp = await this.curriculumService.addAward(this.auth.codeUser, formData).toPromise();
      // @ts-ignore
      if (resp.ok) {
        this.presentToast('Creado con exito');
        this.canEditAwards = !this.canEditAwards;
        this.getAwardsData();
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
  async updateAward(index: number) {
    // si es vacio significa que fue creado por el usuario, entonces agregar a la db
    if (this.awardDataForm.value.awards[index].id === '') { // addNew
      this.addAward(this.awardDataForm.value.awards[index]);
    } else {  // update
      // codigo para hacer el update, el valor esta en
      try {
        const formData = this.awardDataForm.value.awards[index];
        const resp = await this.curriculumService.updateAward(this.auth.codeUser, formData).toPromise();
        // @ts-ignore
        if (resp.ok) {
          this.presentToast('Modificado con exito');
          this.getAwardsData();
        } else {
          // @ts-ignore
          this.presentToast(resp.message);
        }
        this.canEditAwards = !this.canEditAwards;
      } catch (error) {
        console.error('Error en awards', error);
      }
    }
  }

  /**
   * Elimina el dato academico
   * @param index - Elemento a ser eliminado en la db
   */
  async removeAward(index: number) {
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
      const id = this.awardDataForm.value.awards[index].id;
      // si el id es vacio significa que el usuario agrego este elemento, quiza por accidente, entonces solo esta en local
      if (id === '' || id === null) {
        this.removeAwardLocal(index);
      } else {
        // si no es null significa que es un elemento de la api
        try {
          const resp = await this.curriculumService.deleteAward(this.auth.codeUser, id).toPromise();
          if (resp.ok) {
            this.presentToast('Borrado con exito');
            this.removeAwardLocal(index);
          } else {
            this.presentToast(resp.message);
          }
        } catch (error) {
          console.error('Error en awards', error());
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
  private removeAwardLocal(index: number) {
    const control = this.awardDataForm.controls.awards as FormArray;
    control.removeAt(index);
  }
}
