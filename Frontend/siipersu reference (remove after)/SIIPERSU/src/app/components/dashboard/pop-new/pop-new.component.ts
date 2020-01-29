import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PopOverINewstem, PopOverItem } from '../../../interfaces/interfaces';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-pop-new',
  templateUrl: './pop-new.component.html',
  styleUrls: ['./pop-new.component.scss'],
})
export class PopNewComponent implements OnInit {

  @Input() newPop: PopOverINewstem;
  constructor(private formBuilder: FormBuilder, private popOver: PopoverController) {

  }

  fgNew: FormGroup;
  titleModal: string;

  ngOnInit() {
    this.fgNew = this.formBuilder.group({
      title: new FormControl(this.newPop.title, [Validators.required, Validators.maxLength(45)]),
      information: new FormControl(this.newPop.information, [Validators.maxLength(500)]),
      file_url: new FormControl(null),
    });
    this.titleModal = this.newPop.title_card;
  }

  handleFile(files) {
    if(files.length > 0) {
      this.fgNew.patchValue({
        file_url: files[0]
      });
    }
  }

  /**
   * Boton de aceptar
   */
  accept() {
    this.popOver.dismiss({
      canDo: true,
      news: this.fgNew.value
    });
  }

  /**
   * Botton de cancelar
   */
  cancel() {
    this.popOver.dismiss({
      canDo: false
    });
  }
}
