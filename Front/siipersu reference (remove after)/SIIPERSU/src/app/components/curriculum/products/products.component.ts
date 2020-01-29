import { Component, OnInit } from '@angular/core';
import {PopOverItem, ProductsModel} from '../../../interfaces/interfaces';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthServiceService} from '../../../services/auth-service.service';
import {CurriculumService} from '../../../services/curriculum.service';
import {PopoverController, ToastController} from '@ionic/angular';
import {PopConfirmationComponent} from '../../pop-confirmation/pop-confirmation.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  confirmationPop: PopOverItem = {
    title: 'Esta seguro?',
    information: 'Esta accion no se puede recuperar'
  };
  private productDataForm: FormGroup;
  canEditProducts = false;
  productData: ProductsModel[];
  private userType: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthServiceService,
              private curriculumService: CurriculumService,
              public toastController: ToastController,
              private popoverConf: PopoverController
  ) {
    this.productDataForm = this.getProductTemplate();
  }

  async ngOnInit() {
    this.getProductsData();
  }

  /**
   * devuelve los datos de la api
   */
  async getProductsData() {
    try {
      const resp = await this.curriculumService.getProductsData(this.auth.codeUser).toPromise();
      this.userType = this.auth.userType;
      // @ts-ignore
      this.productData = resp.data[0] as ProductsModel;
      this.productDataForm.setValue(this.productData);
    } catch (error) {
      console.error('Error en products', error);
    }
  }

  /**
   * Regresa la plantilla vacia de los elementos que este Form necesita
   */
  private getProductTemplate() {
    return this.formBuilder.group({
      // TODO: validators: max length, Validator.required
      id: new FormControl(''),
      books: new FormControl('', [Validators.required]),
      class_notes: new FormControl('', [Validators.required]),
      didactic_material: new FormControl('', [Validators.required]),
      practice_manual: new FormControl('', [Validators.required]),
      articles: new FormControl('', [Validators.required]),
      congress_memories: new FormControl('', [Validators.required]),
      patents: new FormControl('', [Validators.required]),
      outreach_articles: new FormControl('', [Validators.required]),
      forum_participations: new FormControl('', [Validators.required]),
      industry_services: new FormControl('', [Validators.required]),
      industry_agreements: new FormControl('', [Validators.required]),
      personal_code: new FormControl('')
    });
  }

  /**
   * Agrega un FormGroup con datos vacios a productDataForm, se agrega al inicio
   */
  addProductToGroup() {
    const control = this.productDataForm.controls.products as FormArray;
    control.insert(0, this.getProductTemplate());
  }

  /**
   * Crea un nuevo elemento
   * @param formData - Elemento a agregar
   */
  async addProduct(formData: ProductsModel) {
    try {
      const resp = await this.curriculumService.addProduct(this.auth.codeUser, formData).toPromise();
      // @ts-ignore
      if (resp.ok) {
        this.presentToast('Modificado con exito');
        this.canEditProducts = !this.canEditProducts;
        this.getProductsData();
      } else {
        // @ts-ignore
        this.presentToast(resp.message);
      }
    } catch (error) {
      console.error('Error en products', error);
    }

  }

  /**
   * Actualiza el Dato Academico
   */
  async updateProduct() {
    // si es vacio significa que fue creado por el usuario, entonces agregar a la db
    if (this.productDataForm.value.id === '') { // addNew
      this.addProduct(this.productDataForm.value);
    } else {  // update
      // codigo para hacer el update, el valor esta en
      try {
        const formData = this.productDataForm.value;
        const resp = await this.curriculumService.updateProduct(this.auth.codeUser, formData).toPromise();

        // @ts-ignore
        if (resp.ok) {
          this.presentToast('Modificado con exito');
          this.getProductsData();
        } else {
          // @ts-ignore
          this.presentToast(resp.message);
        }
        this.canEditProducts = !this.canEditProducts;
      } catch (error) {
        console.error('Error en products', error);
      }
    }
  }

  /** Se remueve el componente hasta nuevo aviso
   * Elimina el dato academico
   * @param index - Elemento a ser eliminado en la db
   */
  /*
  async removeProduct(index: number) {
    const popOver = await this.popoverConf.create({
      component: PopConfirmationComponent,
      componentProps: {confirmationPop: this.confirmationPop},
      backdropDismiss: false,
    });
    await popOver.present();
    const {data} = await popOver.onDidDismiss();
    const isDeletable = data.canDo;
    if (isDeletable) {
      const id = this.productDataForm.value.products[index].id;
      // si el id es vacio significa que el usuario agrego este elemento, quiza por accidente, entonces solo esta en local
      if (id === '' || id === null) {
        this.removeProductLocal(index);
      } else {
        // si no es null significa que es un elemento de la api
        try {
          const resp = await this.curriculumService.deleteProduct(this.auth.codeUser, id).toPromise();
          if (resp.ok) {
            this.presentToast('Borrado con exito');
            this.removeProductLocal(index);
          } else {
            this.presentToast(resp.message);
          }
        } catch (error) {
          console.error('Error en Products', error);
        }
      }
    }
  }
*/
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
  private removeProductLocal(index: number) {
    const control = this.productDataForm.controls.products as FormArray;
    control.removeAt(index);
  }
}
