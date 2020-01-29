import { Component, OnInit } from '@angular/core';
import {AchievementModel, PopOverItem} from '../../../interfaces/interfaces';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthServiceService} from '../../../services/auth-service.service';
import {CurriculumService} from '../../../services/curriculum.service';
import {PopoverController, ToastController} from '@ionic/angular';
import {PopConfirmationComponent} from '../../pop-confirmation/pop-confirmation.component';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
})
export class AchievementsComponent implements OnInit {
  confirmationPop: PopOverItem = {
    title: 'Esta seguro?',
    information: 'Esta accion no se puede recuperar'
  };
  private achievementDataForm: FormGroup;
  canEditAchievements = false;
  achievementData: AchievementModel[];
  private userType: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthServiceService,
              private curriculumService: CurriculumService,
              public toastController: ToastController,
              private popoverConf: PopoverController
  ) {
    this.achievementDataForm = this.formBuilder.group({
      achievements: this.formBuilder.array([
        this.getAchievementTemplate()
      ])
    });
  }

  async ngOnInit() {
    this.getAchievementsData();
  }

  /**
   * devuelve los datos de la api
   */
  async getAchievementsData() {
    const control = this.achievementDataForm.controls.achievements as FormArray;  // necesito el control por que es un FormArray
    try {
      const resp = await this.curriculumService.getAchievementsData(this.auth.codeUser).toPromise();
      this.userType = this.auth.userType;
      // @ts-ignore
      this.achievementData = resp.data as ProfessionalAchievementsModel[];
      for (let i = 1; i < this.achievementData.length; i++) {
        control.push(this.getAchievementTemplate());
      }
      control.patchValue(this.achievementData);
    } catch (error) {
      console.error('Error en achievements', error);
    }
  }

  /**
   * Este metodo crea el formGroup que sera utilizado en este componente
   * @returns FormGroup - informacion necesaria
   */
  private getAchievementTemplate() {
    return this.formBuilder.group({
      // TODO: validators: max length, Validator.required
      id: new FormControl(''),
      achievement: new FormControl('', [Validators.required, Validators.maxLength(45), Validators.minLength(1)]),
      personal_code: new FormControl('')
    });
  }

  /**
   * Agrega un FormGroup con datos vacios a achievementDataForm, se agrega al inicio
   */
  addAchievementToGroup() {
    const control = this.achievementDataForm.controls.achievements as FormArray;
    control.insert(0, this.getAchievementTemplate());
  }

  /**
   * Crea un nuevo elemento academico
   * @param formData - Elemento a agregar
   */
  async addAchievement(formData: AchievementModel) {
    try {
      const resp = await this.curriculumService.addAchievement(this.auth.codeUser, formData).toPromise();
      // @ts-ignore
      if (resp.ok) {
        this.presentToast('Creado con exito');
        this.canEditAchievements = !this.canEditAchievements;
        this.getAchievementsData();
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
  async updateAchievement(index: number) {
    // si es vacio significa que fue creado por el usuario, entonces agregar a la db
    if (this.achievementDataForm.value.achievements[index].id === '') { // addNew
      this.addAchievement(this.achievementDataForm.value.achievements[index]);
    } else {  // update
      // codigo para hacer el update
      try {
        const formData = this.achievementDataForm.value.achievements[index];
        const resp = await this.curriculumService.updateAchievement(this.auth.codeUser, formData).toPromise();
        // @ts-ignore
        if (resp.ok) {
          this.presentToast('Modificado con exito');
          this.getAchievementsData();
        } else {
          // @ts-ignore
          this.presentToast(resp.message);
        }
        this.canEditAchievements = !this.canEditAchievements;
      } catch (error) {
        console.error('Error en curriculum', error);
      }
    }
  }

  /**
   * Elimina el logro
   * @param index - Elemento a ser eliminado en la db
   */
  async removeAchievement(index: number) {
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
      const id = this.achievementDataForm.value.achievements[index].id;
      // si el id es vacio significa que el usuario agrego este elemento, quiza por accidente, entonces solo esta en local
      if (id === '' || id === null) {
        this.removeAchievementLocal(index);
      } else {
        // si no es null significa que es un elemento de la api
        try {
          const resp = await this.curriculumService.deleteAchievement(this.auth.codeUser, id).toPromise();
          if (resp.ok) {
            this.presentToast('Borrado con exito');
            this.removeAchievementLocal(index);
          } else {
            this.presentToast(resp.message);
          }
        } catch (error) {
          console.error('Error en Achievements', error);
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
  private removeAchievementLocal(index: number) {
    const control = this.achievementDataForm.controls.achievements as FormArray;
    control.removeAt(index);
  }
}
