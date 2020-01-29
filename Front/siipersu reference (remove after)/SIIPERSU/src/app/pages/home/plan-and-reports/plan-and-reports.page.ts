import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-plan-and-reports',
  templateUrl: './plan-and-reports.page.html',
  styleUrls: ['./plan-and-reports.page.scss'],
})
export class PlanAndReportsPage implements OnInit {
  selectedYear: number;
  canShowCards = false;
  canShowReport = false;
  selectedSemester: string;

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Este metodo regresa un arreglo [] de años desde el año 2000 al actual en orden descendente.
   * si el mes del año actual supera a octubre entonces regresara el año actual mas 1
   * @return list of years[] since 2000
   */
  getYears() {
    const year2000 = 2000;
    const actualYear = new Date();
    // creation of the array
    const years = new Array((actualYear.getFullYear() + 1) - year2000);
    // if actualYear.month > october we add another year
    if (actualYear.getMonth() > 9 ) { // 9 = october... 0 = january
      years.push(0); // we dont care about the value yet
    }
    // filling of array
    for (let i = 0; i < years.length; i++) {
      years[i] = 2000 + i;
    }
    years.reverse();
    return years;
  }

  /**
   * Este metodo regresa un booleano dependiendo de si el semestre es visible o no
   * los primeros 4 meses mostrara plan anual, los siguientes 4 el informe A, el resto del año el informe B
   * @param semester - selected semester
   */
  canShowSemester(semester) {
    if (this.selectedYear < (new Date()).getFullYear()) {
      return true;
    }
    switch (semester) {
      case 'A':
        return (new Date()).getMonth() > 4;
        case 'B':
        return (new Date()).getMonth() > 8;
    }
  }
}
