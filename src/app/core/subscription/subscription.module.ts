import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SubscriptionService } from '@app/core/subscription/services/subscription.service';
import { SubscriptionEffect } from './effects/subscription.effect';
import { SUBSCRIPTION_STATE_TOKEN, subscriptionReducer } from './reducers/subscription.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(SUBSCRIPTION_STATE_TOKEN, subscriptionReducer),
    EffectsModule.forFeature([SubscriptionEffect]),
  ],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
