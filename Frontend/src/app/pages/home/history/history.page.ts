import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  logout() {
    this.router.navigateByUrl('/login');
  }

  profile() {
    this.router.navigateByUrl('/profile');
  }

  comision() {
    this.router.navigateByUrl('/create-comision');
  }

  history() {
    this.router.navigateByUrl('/history');
  }

  viatico() {
    this.router.navigateByUrl('/viatico');
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
