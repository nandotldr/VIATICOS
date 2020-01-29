import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.page.html',
  styleUrls: ['./curriculum.page.scss'],
})
export class CurriculumPage implements OnInit {
  animation = new Array(8); // estilos css para las cartas

  constructor() { }

  ngOnInit() {
  }

  scrollTo(htmlElement: HTMLElement) {
    htmlElement.scrollIntoView();
  }

}
