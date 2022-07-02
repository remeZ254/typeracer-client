import { Injectable } from '@angular/core';
import { Room } from '@app/shared/models/room/room.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';

import { SubscriptionService } from '../services/subscription.service';
import {
  connectedToSubscription,
  connectToSubscription,
  disconnectFromSubscription,
  newRoomMessage,
} from '../actions/room.actions';

@Injectable()
export class RoomEffect {
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

  onRoomMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(connectedToSubscription),
      mergeMap(() => this.subscriptionService.eventMessages$<Room>('room')),
      map((room: Room) => newRoomMessage({ room }))
    )
  );

  constructor(private actions$: Actions, private subscriptionService: SubscriptionService) {}
}
