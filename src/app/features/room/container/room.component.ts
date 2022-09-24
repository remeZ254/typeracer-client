import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { exitRoom, playAgain, sendPlayerUpdate } from '@app/core/room/actions/room.actions';
import { getRoom, getSocketId, RoomState } from '@app/core/room/reducers/room.reducer';
import {
  Room,
  roomModeDisplayResolver,
  RoomModes,
  RoomStatus
} from '@app/shared/models/room/room.model';
import { RoutesEnum } from '@app/shared/models/routes/routes.model';
import { Hotkey, HotkeysService } from '@app/shared/services/hotkeys/hotkeys.service';
import { select, Store } from '@ngrx/store';
import { filter, first, map, Observable } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  providers: [HotkeysService],
  encapsulation: ViewEncapsulation.None
})
export class RoomComponent {
  readonly socketId$: Observable<string>;
  readonly countdown$: Observable<string>;
  readonly room$: Observable<Room>;
  readonly roomModeDisplayResolver: Record<RoomModes, string> = roomModeDisplayResolver;
  readonly RoomStatus = RoomStatus;
  private readonly countDownResolver: Record<RoomStatus, (room: Room) => string> = {
    [RoomStatus.QUEUED]: (room: Room) =>
      room.players.length !== 1 || room.mode === RoomModes.PRACTICE
        ? `${room.countdown}`
        : 'Waiting for players',
    [RoomStatus.ACTIVE]: () => '',
    [RoomStatus.DONE]: () => 'Game Over'
  };
  private readonly raceAgain: Hotkey = {
    name: 'Race Again',
    action: () => this.newRace(),
    key: 'K',
    altKey: true,
    ctrlKey: true
  };
  private readonly leaveGame: Hotkey = {
    name: 'Leave the race',
    action: () => this.goBack(),
    key: 'J',
    altKey: true,
    ctrlKey: true
  };

  constructor(
    private store: Store<RoomState>,
    private router: Router,
    private hotkeysService: HotkeysService
  ) {
    this.socketId$ = this.store.pipe(select(getSocketId));
    this.room$ = this.store.pipe(select(getRoom));
    this.countdown$ = this.room$.pipe(
      map((room: Room) => this.countDownResolver[room.status](room))
    );

    this.room$.pipe(first()).subscribe((room: Room) => {
      !room?.id && this.router.navigate([RoutesEnum.HOME]);
    });

    this.initializeHotKeys();
  }

  onCorrectWord(wordIndex: number) {
    this.store.dispatch(sendPlayerUpdate({ wordIndex }));
  }

  newRace() {
    this.room$.pipe(first()).subscribe(({ mode }) => this.store.dispatch(playAgain({ mode })));
  }

  goBack() {
    this.store.dispatch(exitRoom());
  }

  private initializeHotKeys() {
    this.room$
      .pipe(
        filter(({ status }: Room) => status === RoomStatus.DONE),
        first()
      )
      .subscribe(() => this.hotkeysService.addHotkey(this.raceAgain));

    this.hotkeysService.addHotkey(this.leaveGame);
  }
}
