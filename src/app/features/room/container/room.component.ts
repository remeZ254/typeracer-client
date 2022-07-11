import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { sendPlayerUpdate } from '@app/core/room/actions/room.actions';
import { select, Store } from '@ngrx/store';
import { first, map, Observable } from 'rxjs';

import { getRoom, getSocketId, RoomState } from '@app/core/room/reducers/room.reducer';
import { Room, RoomStatus } from '@app/shared/models/room/room.model';
import { RoutesEnum } from '@app/shared/models/routes/routes.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  uncompletedWords: string[] = [];
  readonly socketId$: Observable<string>;
  readonly countdown$: Observable<string>;
  readonly room$: Observable<Room>;
  readonly RoomStatus = RoomStatus;

  constructor(private store: Store<RoomState>, private router: Router) {
    this.socketId$ = this.store.pipe(select(getSocketId));
    this.room$ = this.store.pipe(select(getRoom));
    this.room$.pipe(first()).subscribe(({ id, text: { quote } }: Room) => {
      !id && this.router.navigate([RoutesEnum.HOME]);
      this.uncompletedWords = quote.split(' ');
    });
    this.countdown$ = this.room$.pipe(
      map(
        (room: Room) =>
          ({
            [RoomStatus.QUEUED]:
              room.players.length === 1 ? 'Waiting for players' : `${room.countdown}`,
            [RoomStatus.ACTIVE]: '',
            [RoomStatus.DONE]: 'Game Over',
          }[room.status])
      )
    );
  }

  onCorrectWord(wordIndex: number) {
    this.store.dispatch(sendPlayerUpdate({ wordIndex }));
  }
}
