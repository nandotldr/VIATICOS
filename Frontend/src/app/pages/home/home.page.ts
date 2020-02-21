import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
tipo_usuario = this.auth.userType;
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
  constructor(private router: Router,
              private auth: AuthService) {}

  ngOnInit() {
  }

}
