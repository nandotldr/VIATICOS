import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department',
  templateUrl: './department.page.html',
  styleUrls: ['./department.page.scss'],
})
export class DepartmentPage implements OnInit {

  animation = new Array(4);
  page: string;
  constructor() { }

  ngOnInit() {
  }

  scrollTo(htmlElement: HTMLElement) {
    htmlElement.scrollIntoView();
  }
}
