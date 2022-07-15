import { Injectable } from '@angular/core';
import { ConfigService } from '@app/services/config.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {
  private readonly authKey;

  constructor(private cookieService: CookieService, private configService: ConfigService) {
    this.authKey = this.configService.get('authKey');
  }

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
