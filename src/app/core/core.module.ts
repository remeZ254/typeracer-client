import { NgModule } from '@angular/core';
import { SubscriptionModule } from '@app/core/subscription/subscription.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [AuthModule, SubscriptionModule]
})
export class CoreModule {}
