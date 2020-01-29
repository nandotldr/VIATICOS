import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  codeUrl: string;
  animation = new Array(5); // estilos css para las cartas
  constructor(private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.codeUrl = this.activatedRoute.snapshot.paramMap.get('id');
  }

  scrollTo(htmlElement: HTMLElement) {
    htmlElement.scrollIntoView();
  }
}
