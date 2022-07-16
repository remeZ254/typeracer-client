import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { roomMock } from '@app/shared/mocks/room/room.mock';
import { first, map, Observable, of } from 'rxjs';

import { Room, RoomStatus } from '@app/shared/models/room/room.model';
import { RoutesEnum } from '@app/shared/models/routes/routes.model';

@Component({
  selector: 'app-practice-room',
  templateUrl: './practice-room.component.html',
  styleUrls: ['../styles/room.component.scss'],
})
export class PracticeRoomComponent {
  uncompletedWords: string[] = [];
  readonly countdown$: Observable<string>;
  readonly room$: Observable<Room>;

  constructor(private router: Router) {
    this.room$ = of(roomMock);

    this.room$.pipe(first()).subscribe(({ id, text: { quote } }: Room) => {
      !id && this.router.navigate([RoutesEnum.HOME]);
      this.uncompletedWords = quote.split(' ');
    });
    this.countdown$ = this.room$.pipe(
      map(
        (room: Room) =>
          ({
            [RoomStatus.QUEUED]: `${room.countdown}`,
            [RoomStatus.ACTIVE]: '',
            [RoomStatus.DONE]: 'Game Over',
          }[room.status])
      )
    );
  }

  onCorrectWord(wordIndex: number) {}
}
