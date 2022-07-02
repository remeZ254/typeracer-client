import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { RoutesEnum } from '@app/shared/models/routes/routes.model';

import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    return this.authService.isLoggedIn() || this.router.createUrlTree([RoutesEnum.LOGIN]);
  }
}
