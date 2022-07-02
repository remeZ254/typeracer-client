import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';

import { connectToSubscription, disconnectFromSubscription } from '../actions/subscription.actions';
import { SubscriptionService } from '../services/subscription.service';

@Injectable()
export class SubscriptionEffect {
  connect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(connectToSubscription),
        tap(() => this.subscriptionService.connect())
      ),
    { dispatch: false }
  );

  disconnect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(disconnectFromSubscription),
        tap(() => this.subscriptionService.disconnect())
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private subscriptionService: SubscriptionService) {}
}
