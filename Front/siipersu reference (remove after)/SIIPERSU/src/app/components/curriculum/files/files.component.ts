import {Component, OnInit} from '@angular/core';
import {FileModel, PopOverItem} from '../../../interfaces/interfaces';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthServiceService} from '../../../services/auth-service.service';
import {CurriculumService} from '../../../services/curriculum.service';
import {PopoverController, ToastController} from '@ionic/angular';
import {PopConfirmationComponent} from '../../pop-confirmation/pop-confirmation.component';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit {
  confirmationPop: PopOverItem = {
    title: 'Esta seguro?',
    information: 'Esta accion no se puede recuperar'
  };
  private fileDataForm: FormGroup;
  canEditFiles = false;
  fileData: FileModel[];
  private userType: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthServiceService,
              private curriculumService: CurriculumService,
              public toastController: ToastController,
              private popoverConf: PopoverController
  ) {
    this.fileDataForm = this.formBuilder.group({
      files: this.formBuilder.array([
        this.getFileTemplate()
      ])
    });
  }

  async ngOnInit() {
    this.getFilesData();
  }

  /**
   * devuelve los datos de la api
   */
  async getFilesData() {
    const control = this.fileDataForm.controls.files as FormArray;  // necesito el control por que es un FormArray
    try {
      const resp = await this.curriculumService.getFilesData(this.auth.codeUser).toPromise();
      this.userType = this.auth.userType;
      // @ts-ignore
      this.fileData = resp.data as ProfessionalFilesModel[];
      for (let i = 1; i < this.fileData.length; i++) {
        control.push(this.getFileTemplate());
      }
      control.patchValue(this.fileData);
    } catch (error) {
      console.error('Error en academic data', error);
    }
  }

  /**
   * Regresa la plantilla vacia de los elementos que este Form necesita
   */
  private getFileTemplate() {
    return this.formBuilder.group({
      // TODO: validators: max length, Validator.required
      id: new FormControl(''),
      record: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]),
      personal_code: new FormControl('')
    });
  }

  /**
   * Agrega un FormGroup con datos vacios a fileDataForm, se agrega al inicio
   */
  addFileToGroup() {
    const control = this.fileDataForm.controls.files as FormArray;
    control.insert(0, this.getFileTemplate());
  }

  /**
   * Crea un nuevo elemento academico
   * @param formData - Elemento a agregar
   */
  async addFile(formData: FileModel) {
    try {
      const resp = await this.curriculumService.addFile(this.auth.codeUser, formData).toPromise();
      console.log('post', resp);
      // @ts-ignore
      if (resp.ok) {
        this.presentToast('Creado con exito');
        this.canEditFiles = !this.canEditFiles;
        this.getFilesData();
      } else {
        // @ts-ignore
        this.presentToast(resp.message);
      }
    } catch (error) {
      console.error('Error en curriculum', error);
    }

  }

  /**
   * Actualiza el Dato en el index dado
   * @param index - Elemento a actualizar
   */
  async updateFile(index: number) {
    // si es vacio significa que fue creado por el usuario, entonces agregar a la db
    if (this.fileDataForm.value.files[index].id === '') { // addNew
      this.addFile(this.fileDataForm.value.files[index]);
    } else {  // update
      // codigo para hacer el update, el valor esta en
      try {
        const formData = this.fileDataForm.value.files[index];
        const resp = await this.curriculumService.updateFile(this.auth.codeUser, formData).toPromise();
        // @ts-ignore
        if (resp.ok) {
          this.presentToast('Modificado con exito');
          this.getFilesData();
        } else {
          // @ts-ignore
          this.presentToast(resp.message);
        }
        this.canEditFiles = !this.canEditFiles;
      } catch (error) {
        console.error('Error en curriculum', error);
      }
    }
  }

  /**
   * Elimina el dato academico
   * @param index - Elemento a ser eliminado en la db
   */
  async removeFile(index: number) {
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
      const id = this.fileDataForm.value.files[index].id;
      // si el id es vacio significa que el usuario agrego este elemento, quiza por accidente, entonces solo esta en local
      if (id === '' || id === null) {
        this.removeFileLocal(index);
      } else {
        // si no es null significa que es un elemento de la api
        try {
          const resp = await this.curriculumService.deleteFile(this.auth.codeUser, id).toPromise();
          if (resp.ok) {
            this.presentToast('Borrado con exito');
            this.removeFileLocal(index);
          } else {
            this.presentToast(resp.message);
          }
        } catch (error) {
          console.error('Error en files', error);
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
  private removeFileLocal(index: number) {
    const control = this.fileDataForm.controls.files as FormArray;
    control.removeAt(index);
  }
}
