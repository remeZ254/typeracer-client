import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  readonly creatorName: string = 'Zemer Hiyret';
  readonly creatorNumber: string = '530-2525';
  auth: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.auth) {
      this.authService.logIn(this.auth);
      this.router.navigate(['/']);
    }
  }
}
