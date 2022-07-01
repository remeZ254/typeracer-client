import { NgModule } from '@angular/core';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './service/auth.service';

@NgModule({
  providers: [AuthGuard, AuthService],
})
export class AuthModule {}
