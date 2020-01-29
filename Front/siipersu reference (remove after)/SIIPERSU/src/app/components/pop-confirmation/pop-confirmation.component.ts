import {Component, Input, OnInit} from '@angular/core';
import {PopOverItem} from '../../interfaces/interfaces';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-pop-confirmation',
  templateUrl: './pop-confirmation.component.html',
  styleUrls: ['./pop-confirmation.component.scss'],
})
export class PopConfirmationComponent implements OnInit {

  @Input() confirmationPop: PopOverItem;

  constructor(private popOver: PopoverController) {
  }

  title: string;
  information: string;

  ngOnInit() {
    this.title = this.confirmationPop.title;
    this.information = this.confirmationPop.information;
  }

  /**
   * Si el usuario acepta, boton aceptar
   */
  accept() {
    this.popOver.dismiss({
      canDo: true
    });
  }

  /**
   * Si el usuario rechaza, boton cancelar
   */
  cancel() {
    this.popOver.dismiss({
      canDo: false
    });
  }
}
