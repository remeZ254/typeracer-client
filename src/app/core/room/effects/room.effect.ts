import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Room, RoomModes } from '@app/shared/models/room/room.model';
import { RoutesEnum } from '@app/shared/models/routes/routes.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { filter, first, map, mergeMap, switchMap, tap } from 'rxjs';

import {
  connectedToSubscription,
  connectToSubscription,
  disconnectedFromSubscription,
  disconnectFromSubscription,
  exitRoom,
  newRoomMessage,
  playAgain,
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
        tap(({ mode }) => this.subscriptionService.connect(mode))
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

  private readonly playAgain$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playAgain),
      tap(() => this.store.dispatch(disconnectFromSubscription())),
      switchMap(({ mode }) =>
        this.actions$.pipe(
          ofType(disconnectedFromSubscription),
          first(),
          map(() => connectToSubscription({ mode }))
        )
      )
    )
  );

  private readonly exitRoom$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(exitRoom),
        tap(() => this.store.dispatch(disconnectFromSubscription())),
        switchMap(() =>
          this.actions$.pipe(
            ofType(disconnectedFromSubscription),
            first(),
            map(() => this.router.navigate([RoutesEnum.HOME]))
          )
        )
      ),
    { dispatch: false }
  );

  private readonly onRoomMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(connectedToSubscription),
      tap(({ mode }) => this.subscriptionService.sendMessage<RoomModes>('joinRoom', mode)),
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
          tap(({ room }) => this.router.navigate([`${RoutesEnum.ROOM}/${room.id}`])),
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
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
}
