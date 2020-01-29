import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.scss'],
})
export class CollegeComponent implements OnInit {

  @Input() year;
  constructor() { }

  // TODO: pendiente funcionamiento de colegios
  ngOnInit() {}

}
