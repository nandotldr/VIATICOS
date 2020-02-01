import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-viatico',
  templateUrl: './viatico.page.html',
  styleUrls: ['./viatico.page.scss','../../../app.component.scss'],
})
export class ViaticoPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

}
