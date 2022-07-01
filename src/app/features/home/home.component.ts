import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly auth: string;

  constructor(private authService: AuthService) {
    this.auth = authService.getAuth();
  }
}
