import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/core/auth/service/auth.service';
import { RoutesEnum } from '@app/shared/models/routes/routes.model';
import { first, timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  auth: string = '';
  showError: boolean = false;
  shakeInput: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.auth) {
      this.authService.logIn(this.auth);
      this.router.navigate([RoutesEnum.HOME]);
    } else {
      this.showError = true;
      this.shakeInput = true;
      timer(300)
        .pipe(first())
        .subscribe(() => (this.shakeInput = false));
    }
  }

  onInput(event: Event) {
    this.auth = (event.target as HTMLTextAreaElement).value;
    this.showError = !this.auth;
    this.shakeInput = false;
  }
}
