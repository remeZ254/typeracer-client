import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap, tap } from 'rxjs';

import { SubscriptionService } from '../services/subscription.service';
import { connectedToSubscription, connectToSubscription } from '../actions/subscription.actions';

@Injectable()
export class SubscriptionEffect {
  connect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(connectToSubscription),
      tap(() => this.subscriptionService.connect()),
      switchMap(() => of(connectedToSubscription()))
    )
  );

  constructor(private actions$: Actions, private subscriptionService: SubscriptionService) {}
}
