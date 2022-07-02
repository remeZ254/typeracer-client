import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';

import { Room } from '@app/shared/models/room/room.model';
import { RoomService } from '../services/room.service';
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
        tap(() => this.roomService.connect())
      ),
    { dispatch: false }
  );

  disconnect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(disconnectFromSubscription),
        tap(() => this.roomService.disconnect())
      ),
    { dispatch: false }
  );

  onRoomMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(connectedToSubscription),
      mergeMap(() => this.roomService.eventMessages$<Room>()),
      map((room: Room) => newRoomMessage({ room }))
    )
  );

  constructor(private actions$: Actions, private roomService: RoomService) {}
}
