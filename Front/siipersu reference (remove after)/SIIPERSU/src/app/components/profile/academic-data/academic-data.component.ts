import { Component, Input, OnInit } from '@angular/core';
import { AcademicDataModel, LaboralDataModel, PersonalDataModel, PopOverItem } from '../../../interfaces/interfaces';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../services/auth-service.service';
import { ProfileService } from '../../../services/profile.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { ACADEMIC_DATA_DICTIONARY } from '../../../dictionaries/profile';
import { environment } from '../../../../environments/environment';
import { PopConfirmationComponent } from '../../pop-confirmation/pop-confirmation.component';

@Component({
  selector: 'app-academic-data',
  templateUrl: './academic-data.component.html',
  styleUrls: ['./academic-data.component.scss'],
})
export class AcademicDataComponent implements OnInit {
  confirmationPop: PopOverItem = {
    title: 'Esta seguro?',
    information: 'Esta accion no se puede recuperar'
  };
  private academicDataForm: FormGroup;
  academicDataDic: { [key: string]: any };
  canEditAcademicData = false;
  academicData: AcademicDataModel[];
  private FILE_URL: string;
  private userType: string;

  @Input() codeUrl: string;

  constructor(private formBuilder: FormBuilder,
    private auth: AuthServiceService,
    private profileService: ProfileService,
    public toastController: ToastController,
    private popoverConf: PopoverController
  ) {
    this.academicDataForm = this.formBuilder.group({
      academics: this.formBuilder.array([
        this.getAcademicTemplate()
      ])
    });
  }

  async ngOnInit() {
    this.academicDataDic = ACADEMIC_DATA_DICTIONARY;
    // hago esto por si un cp trata de eliminar al maestro, si te fijas en la url es el usuario a ser eliminado
    if (this.auth.userType === 'MT' || this.auth.userType === 'CA') {
      this.codeUrl = this.auth.codeUser;
    }
    this.getAcademicData();
  }

  /**
   * devuelve los datos de la api
   */
  async getAcademicData() {
    const control = this.academicDataForm.controls.academics as FormArray;  // necesito el control por que es un FormArray
    try {
      const resp = await this.profileService.getAcademicData(this.codeUrl).toPromise();
      this.userType = this.auth.userType;
      // fill es para rellenar los campos del codigo, es necesario porque el bakend pide el codigo como cadena, pero codeUser es un entero
      let fill = '';
      for (let i = (this.codeUrl + '').length; i < 8; i++) {
        fill += '0';
      }
      // hace referencia a los archivos, imagenes o cosas descargables
      this.FILE_URL = `${environment.API}/public/personal/${fill}${this.codeUrl}/`;
      this.academicData = resp['data'] as AcademicDataModel[];
      for (let i = 1; i < this.academicData.length; i++) {
        control.push(this.getAcademicTemplate());
      }
      control.patchValue(this.academicData);
    } catch (error) {
      console.error('Error en academic data', error);
    }
  }

  /**
   * Regresa la plantilla vacia de los elementos que este Form necesita
   */
  private getAcademicTemplate() {
    return this.formBuilder.group({
      id: new FormControl(''),
      degree: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      degree_url: new FormControl(null, []),
      start_degree: new FormControl('', [Validators.required]),
      finish_degree: new FormControl('', [Validators.required]),
      university_given_degree: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      laboral_type_degree: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      active: new FormControl(true, [Validators.required]),
    });
  }

  /**
   * Agrega un FormGroup con datos vacios a academicDataForm, se agrega al inicio
   */
  addAcademicToGroup() {
    const control = this.academicDataForm.controls.academics as FormArray;
    control.insert(0, this.getAcademicTemplate());
  }

  /**
   * Crea un nuevo elemento academico
   * @param formData - Elemento a agregar
   */
  addAcademic(formData: AcademicDataModel) {
    console.log(formData);
    
    let data = new FormData();
    data.append('degree', formData.degree);
    if(formData.degree_url != null)
      data.append('degree_file', formData.degree_url);
    data.append('start_degree', new Date(formData.start_degree).toJSON().slice(0, 10));
    data.append('finish_degree', new Date(formData.finish_degree).toJSON().slice(0, 10));
    data.append('university_given_degree', formData.university_given_degree);
    data.append('laboral_type_degree', formData.laboral_type_degree);
    data.append('active', formData.active ? '1' : '0');
    data.append('personal_data_code', this.codeUrl);
    this.profileService.createAcademicData(this.codeUrl, data).subscribe(data => {
      console.log(data);
      if (data['ok']) {
        this.presentToast('Agregado exitosamente.');
        this.canEditAcademicData = !this.canEditAcademicData;
      } else {
        this.presentToast(data['message']);
      }
    });

  }

  /**
   * Actualiza el Dato Academico en el index dado
   * @param index - Elemento a actualizar
   */
  updateAcademic(index: number) {
    // si es vacio significa que fue creado por el usuario, entonces agregar a la db
    if (this.academicDataForm.value.academics[index].id === '') { // addNew
      this.addAcademic(this.academicDataForm.value.academics[index]);
    } else {  // update
      // codigo para hacer el update, el valor esta en
      const formData = this.academicDataForm.value.academics[index];
      if (formData['active'] === 1) {
        this.setActiveData(index);
      }
      let data = new FormData();
      data.append('id', formData.id);
      data.append('degree', formData.degree);
      if(formData.degree_url.name != undefined)
        data.append('degree_file', formData.degree_url);
      data.append('start_degree', new Date(formData.start_degree).toJSON().slice(0, 10));
      data.append('finish_degree', new Date(formData.finish_degree).toJSON().slice(0, 10));
      data.append('university_given_degree', formData.university_given_degree);
      data.append('laboral_type_degree', formData.laboral_type_degree);
      data.append('active', formData.active ? '1' : '0');
      data.append('personal_data_code', this.codeUrl);
      this.profileService.updateAcademicData(this.codeUrl, data).subscribe(data => {
        console.log(data);
        
        if (data['ok']) {
          this.presentToast('Actualizado exitosamente.');
          this.getAcademicData();
        } else {
          this.presentToast(data['message']);
        }
      });
    }
  }

  /**
   * Hace que todos los elementos del FormData en el campo 'active' sean falsos a excepcion del elemento especificado
   * @param index - Elemento que no se modificara a falso en el campo 'active'
   */
  private setActiveData(index: number) {
    this.academicDataForm.value.academics.forEach((value, i) => {
      if (index !== i) {
        if (value['active']) {
          value['active'] = 0;
          this.updateAcademic(i);
        }
      }
    });
  }

  /**
   * Elimina el dato academico
   * @param index - Elemento a ser eliminado en la db
   */
  async removeAcademic(index: number) {
    // esto llama a un popover para confirmar la eliminacion del usuario
    const popOver = await this.popoverConf.create({
      component: PopConfirmationComponent,
      componentProps: { confirmationPop: this.confirmationPop },
      backdropDismiss: false,
    });
    await popOver.present();
    const { data } = await popOver.onDidDismiss();
    const isDeletable = data.canDo;
    // si el usuario acepta
    if (isDeletable) {
      const id = this.academicDataForm.value.academics[index].id;
      // si el id es vacio significa que el usuario agrego este elemento, quiza por accidente, entonces solo esta en local
      if (id === '' || id === null) {
        this.removeAcademicLocal(index);
      } else {
        // si no es null significa que es un elemento de la api
        try {
          const resp = await this.profileService.deleteAcademic(this.codeUrl, id).toPromise();
          if (resp.ok) {
            this.presentToast('Borrado con exito');
            this.removeAcademicLocal(index);
          } else {
            this.presentToast(resp.message);
          }
        } catch (error) {
          console.error('Error en academic data', error);
        }
      }
    }
  }

  handleFile(files, academy: FormGroup) {
    if (files.length === 0) return;
    academy.patchValue({
      degree_url: files[0]
    });
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
  private removeAcademicLocal(index: number) {
    const control = this.academicDataForm.controls.academics as FormArray;
    control.removeAt(index);
  }

  /**
   * Abre el archivo en una nueva pestaña
   * @param link - link a abrir
   */
  openFile(link: string) {
    window.open(this.FILE_URL + link, '_blank').focus();
  }
}
