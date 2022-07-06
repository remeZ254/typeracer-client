import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getRoom, RoomState } from '@app/core/room/reducers/room.reducer';
import { roomMock } from '@app/shared/mocks/room/room.mock';
import { Room } from '@app/shared/models/room/room.model';
import { select, Store } from '@ngrx/store';
import { first, Observable, of } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  uncompletedWords: string[] = [];
  readonly room$: Observable<Room>;

  constructor(private route: ActivatedRoute, private store: Store<RoomState>) {
    this.room$ = this.store.pipe(select(getRoom));
    this.room$ = of(roomMock);
    this.room$
      .pipe(first())
      .subscribe(({ text: { quote } }) => (this.uncompletedWords = quote.split(' ')));
  }
}
