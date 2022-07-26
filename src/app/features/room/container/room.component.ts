import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { exitRoom, playAgain, sendPlayerUpdate } from '@app/core/room/actions/room.actions';
import { getRoom, getSocketId, RoomState } from '@app/core/room/reducers/room.reducer';
import {
  Room,
  roomModeDisplayResolver,
  RoomModes,
  RoomStatus,
} from '@app/shared/models/room/room.model';
import { RoutesEnum } from '@app/shared/models/routes/routes.model';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RoomComponent {
  quote: string;
  readonly socketId$: Observable<string>;
  readonly countdown$: Observable<string>;
  readonly room$: Observable<Room>;
  readonly roomModeDisplayResolver: Record<RoomModes, string> = roomModeDisplayResolver;
  readonly RoomStatus = RoomStatus;
  private mode: RoomModes;

  constructor(private store: Store<RoomState>, private router: Router) {
    this.socketId$ = this.store.pipe(select(getSocketId));
    this.room$ = this.store.pipe(select(getRoom));
    this.countdown$ = this.room$.pipe(
      map(
        (room: Room) =>
          ({
            [RoomStatus.QUEUED]:
              room.players.length !== 1 || room.mode === RoomModes.PRACTICE
                ? `${room.countdown}`
                : 'Waiting for players',
            [RoomStatus.ACTIVE]: '',
            [RoomStatus.DONE]: 'Game Over',
          }[room.status])
      )
    );

    this.room$.subscribe((room: Room) => {
      !room?.id && this.router.navigate([RoutesEnum.HOME]);
      this.quote = room?.text.quote;
      this.mode = room.mode;
    });
  }

  onCorrectWord(wordIndex: number) {
    this.store.dispatch(sendPlayerUpdate({ wordIndex }));
  }

  newRace() {
    this.store.dispatch(playAgain({ mode: this.mode }));
  }

  goBack() {
    this.store.dispatch(exitRoom());
  }
}
