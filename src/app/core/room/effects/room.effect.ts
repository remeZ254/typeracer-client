import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Room } from '@app/shared/models/room/room.model';
import { RoutesEnum } from '@app/shared/models/routes/routes.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { filter, first, map, mergeMap, switchMap, tap } from 'rxjs';

import {
  connectedToSubscription,
  connectToSubscription,
  disconnectFromSubscription,
  newRoomMessage,
  sendPlayerUpdate,
} from '../actions/room.actions';
import { getRoomAuth, RoomState } from '../reducers/room.reducer';
import { RoomSubscriptionService } from '../services/room-subscription.service';

// noinspection JSUnusedLocalSymbols
@Injectable()
export class RoomEffect {
  private readonly connect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(connectToSubscription),
        tap(() => this.subscriptionService.connect())
      ),
    { dispatch: false }
  );

  private readonly disconnect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(disconnectFromSubscription),
        tap(() => this.subscriptionService.disconnect())
      ),
    { dispatch: false }
  );

  private readonly onRoomMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(connectedToSubscription),
      mergeMap(() => this.subscriptionService.eventMessages$<Room>()),
      map((room: Room) => newRoomMessage({ room }))
    )
  );

  private readonly onFirstRoomMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(connectedToSubscription),
      switchMap(() =>
        this.actions$.pipe(
          ofType(newRoomMessage),
          first(),
          tap(() => this.router.navigate([RoutesEnum.ROOM])),
          switchMap(() =>
            this.router.events.pipe(
              filter((event) => event instanceof NavigationStart),
              first(),
              map(() => disconnectFromSubscription())
            )
          )
        )
      )
    )
  );

  private readonly sendPlayerUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendPlayerUpdate),
        switchMap(({ wordIndex }) =>
          this.store.pipe(
            select(getRoomAuth),
            tap(({ socketId, roomId }) =>
              this.subscriptionService.sendMessage('playerUpdate', { wordIndex, roomId, socketId })
            )
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private subscriptionService: RoomSubscriptionService,
    private store: Store<RoomState>,
    private router: Router
  ) {}
}
