import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {
  private readonly authKey = 'nickName';

  constructor(private cookieService: CookieService) {}

  logIn(auth: string) {
    this.cookieService.set(this.authKey, auth);
  }

  isLoggedIn(): boolean {
    return this.cookieService.check(this.authKey);
  }

  getAuth(): string {
    return this.cookieService.get(this.authKey);
  }
}
