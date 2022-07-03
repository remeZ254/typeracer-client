import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesEnum } from '@app/shared/models/routes/routes.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { first, map, mergeMap, switchMap, tap } from 'rxjs';
import { getRoomId, RoomState } from '@app/core/room/reducers/room.reducer';
import { Room } from '@app/shared/models/room/room.model';
import {
  connectedToSubscription,
  connectToSubscription,
  disconnectFromSubscription,
  newRoomMessage,
} from '../actions/room.actions';
import { RoomService } from '../services/room.service';

// noinspection JSUnusedLocalSymbols
@Injectable()
export class RoomEffect {
  private readonly connect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(connectToSubscription),
        tap(() => this.roomService.connect())
      ),
    { dispatch: false }
  );

  private readonly disconnect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(disconnectFromSubscription),
        tap(() => this.roomService.disconnect())
      ),
    { dispatch: false }
  );

  private readonly onRoomMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(connectedToSubscription),
      mergeMap(() => this.roomService.eventMessages$<Room>()),
      map((room: Room) => newRoomMessage({ room }))
    )
  );

  private readonly onFirstRoomMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(newRoomMessage),
        switchMap(() => this.store.pipe(select(getRoomId))),
        first(),
        tap((id: string) => this.router.navigate([RoutesEnum.ROOM.replace(':id', id)]))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private roomService: RoomService,
    private store: Store<RoomState>,
    private router: Router
  ) {}
}
