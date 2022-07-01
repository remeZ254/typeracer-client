import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  auth: string = '';
  showError: boolean = false;
  shakeInput: boolean = false;
  readonly creatorName: string = 'Zemer Hiyret';
  readonly creatorNumber: string = '530-2525';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.auth) {
      this.authService.logIn(this.auth);
      this.router.navigate(['/']);
    } else {
      this.showError = true;
      this.shakeInput = true;
    }
  }

  onInput(event: Event) {
    this.auth = (event.target as HTMLTextAreaElement).value;
    this.showError = !this.auth;
    this.shakeInput = false;
  }
}
