import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getRoom, RoomState } from '@app/core/room/reducers/room.reducer';
import { Room, RoomStatus } from '@app/shared/models/room/room.model';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  room$: Observable<Room>;

  constructor(private route: ActivatedRoute, private store: Store<RoomState>) {
    this.room$ = this.store.pipe(select(getRoom));
    this.room$ = of({
      id: '6c6c4ba4-f55d-4a3b-b48f-7712a83e76b7',
      status: RoomStatus.QUEUED,
      players: [
        { socketId: 'elZDsf3dieqeGgsfAAA3', nickName: 'Guest', completedWords: 0, wpm: 0 },
        { socketId: 'nKq6kK31AKCqt53pAABP', nickName: 'itypeforbyron', completedWords: 26, wpm: 80 },
      ],
      words: [
        "I've",
        'seen',
        'it',
        'watching',
        'me,',
        'that',
        'misty',
        'thing',
        'without',
        'a',
        'face.',
        'It',
        'weaves',
        'my',
        'thoughts,',
        'lined',
        'them',
        'up',
        'in',
        'black',
        'lace.',
        'It',
        'buries',
        'my',
        'shape',
        'and',
        'leaves',
        'no',
        'trace.',
        'Tomorrow',
        'I',
        'will',
        'have',
        'no',
        'shame,',
        'and',
        'I',
        'will',
        'start',
        'again.',
      ],
    });
  }
}
