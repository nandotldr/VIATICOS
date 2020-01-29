import {Component, Input, OnInit} from '@angular/core';
import {SkillLanguageModel, SkillProgramModel, PopOverItem} from '../../../interfaces/interfaces';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthServiceService} from '../../../services/auth-service.service';
import {ProfileService} from '../../../services/profile.service';
import {PopoverController, ToastController} from '@ionic/angular';
import {PopConfirmationComponent} from '../../pop-confirmation/pop-confirmation.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  confirmationPop: PopOverItem = {
    title: 'Esta seguro?',
    information: 'Esta accion no se puede recuperar'
  };
  private skillForm: FormGroup;
  canEditSkills = false;
  canAddLanguage = false;
  canAddProgram = false;
  skillLanguage: SkillLanguageModel[];
  skillProgram: SkillProgramModel[];
  private userType: string;

  @Input() codeUrl: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthServiceService,
              private profileService: ProfileService,
              public toastController: ToastController,
              private popoverConf: PopoverController
  ) {
    this.skillForm = this.formBuilder.group({
      languages: this.formBuilder.array([
        this.getSkillLanguageTemplate()
      ]),
      programs: this.formBuilder.array([
        this.getSkillProgramTemplate()
      ])
    });
  }

  async ngOnInit() {
    // hago esto por si un cp trata de eliminar al maestro, si te fijas en la url es el usuario a ser eliminado
    if (this.auth.userType === 'MT' || this.auth.userType === 'CA') {
      this.codeUrl = this.auth.codeUser;
    }
    this.getSkills();
  }

  /**
   * devuelve los las habilidades
   */
  async getSkills() {
    const languagesControl = this.skillForm.controls.languages as FormArray;  // necesito el control porque es un FormArray
    const programsControl = this.skillForm.controls.programs as FormArray;  // necesito el control porque es un FormArray
    try {
      const resp = await this.profileService.getSkills(this.codeUrl).toPromise();
      this.userType = this.auth.userType;
      // @ts-ignore
      this.skillLanguage = resp['data']['languages'] as SkillLanguageModel[];
      // @ts-ignore
      this.skillProgram = resp['data']['programs'] as SkillProgramModel[];

      // control para los lenguajes
      for (let i = 1; i < this.skillLanguage.length; i++) {
        languagesControl.push(this.getSkillLanguageTemplate());
      }
      // control para los programas
      for (let i = 1; i < this.skillProgram.length; i++) {
        programsControl.push(this.getSkillProgramTemplate());
      }
      languagesControl.patchValue(this.skillLanguage);
      programsControl.patchValue(this.skillProgram);
      // console.log(this.skillForm.value);
    } catch (error) {
      console.error('Error en skill data', error);
    }
  }

  /**
   * Regresa la plantilla vacia de los elementos que este Form necesita
   */
  private getSkillProgramTemplate() {
    return this.formBuilder.group({
      id: new FormControl(''),
      program: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      usage: new FormControl('', [Validators.required]),
      personal_data_code: new FormControl('')
    });
  }

  /**
   * Regresa la plantilla vacia de los elementos que este Form necesita
   */
  private getSkillLanguageTemplate() {
    return this.formBuilder.group({
      id: new FormControl(''),
      language: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      spoken: new FormControl('', [Validators.required]),
      comprehension: new FormControl('', [Validators.required]),
      reading: new FormControl('', [Validators.required]),
      written: new FormControl('', [Validators.required]),
      personal_data_code: new FormControl(''),
    });
  }

  /**
   * Elimina el dato skillo
   * @param index - Elemento a ser eliminado en la db
   */
  async removeLanguage(index: number) {
    const popOver = await this.popoverConf.create({
      component: PopConfirmationComponent,
      componentProps: {confirmationPop: this.confirmationPop},
      backdropDismiss: false,
    });
    await popOver.present();
    const {data} = await popOver.onDidDismiss();
    const isDeletable = data.canDo;
    if (isDeletable) {
      const id = this.skillForm.value.languages[index].id;
      console.log(id);
      // si el id es vacio significa que el usuario agrego este elemento, quiza por accidente, entonces solo esta en local
      if (id === '' || id === null) {
        this.removeLanguageLocal(index);
      } else {
        // si no es null significa que es un elemento de la api
        const resp = await this.profileService.deleteLanguage(this.codeUrl, id).toPromise();
        if (resp.ok) {
          this.presentToast('Borrado con exito');
          this.removeLanguageLocal(index);
        } else {
          this.presentToast(resp.message);
        }
      }
    }
  }

  /**
   * Elimina el dato skillo
   * @param index - Elemento a ser eliminado en la db
   */
  async removeProgram(index: number) {
    // esto llama a un popover para confirmar la eliminacion del usuario
    const popOver = await this.popoverConf.create({
      component: PopConfirmationComponent,
      componentProps: {confirmationPop: this.confirmationPop},
      backdropDismiss: false,
    });
    await popOver.present();
    const {data} = await popOver.onDidDismiss();
    const isDeletable = data.canDo;
    if (isDeletable) {
      const id = this.skillForm.value.programs[index].id;
      console.log(id);
      // si el id es vacio significa que el usuario agrego este elemento, quiza por accidente, entonces solo esta en local
      if (id === '' || id === null) {
        this.removeProgramLocal(index);
      } else {
        // si no es null significa que es un elemento de la api
        const resp = await this.profileService.deleteProgram(this.codeUrl, id).toPromise();
        if (resp.ok) {
          this.presentToast('Borrado con exito');
          this.removeProgramLocal(index);
        } else {
          this.presentToast(resp.message);
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
  private removeLanguageLocal(index: number) {
    const control = this.skillForm.controls.languages as FormArray;
    control.removeAt(index);
  }

  /**
   * Elimina el FormGroup del elemento especificado de forma local
   * @param index - Elemento a ser eliminado
   */
  private removeProgramLocal(index: number) {
    const control = this.skillForm.controls.programs as FormArray;
    control.removeAt(index);
  }

  async createProgram() {
    this.canAddProgram = !this.canAddProgram;
    const resp = await this.profileService.addProgram(this.codeUrl, this.skillForm.value['programs'][0]).toPromise();
    if (resp['ok']) {
      this.presentToast('Agregado exitosamente');
    } else {
      this.presentToast(resp['message']);
    }
  }

  async createLanguage() {
    this.canAddLanguage = !this.canAddLanguage;
    const resp = await this.profileService.addLanguage(this.codeUrl, this.skillForm.value['languages'][0]).toPromise();
    if (resp['ok']) {
      this.presentToast('Agregado exitosamente');
    } else {
      this.presentToast(resp['message']);
    }
  }

  /**
   * Agrega un FormGroup con datos vacios a skillLanguageForm, se agrega al inicio
   */
  addLanguageToGroup() {
    const control = this.skillForm.controls.languages as FormArray;
    control.insert(0, this.getSkillLanguageTemplate());
    this.canAddLanguage = !this.canAddLanguage;
  }

  /**
   * Agrega un FormGroup con datos vacios a skillProgramForm, se agrega al inicio
   */
  addProgramToGroup() {
    const control = this.skillForm.controls.programs as FormArray;
    control.insert(0, this.getSkillProgramTemplate());
    this.canAddProgram = !this.canAddProgram;
  }

  /**
   * Navega hacia un elemento dado del html
   * @param htmlElement - id del elemento
   */
  scrollTo(htmlElement: HTMLElement) {
    htmlElement.scrollIntoView();
  }
}

