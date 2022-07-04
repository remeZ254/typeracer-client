import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getRoom, RoomState } from '@app/core/room/reducers/room.reducer';
import { Room } from '@app/shared/models/room/room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  room$: Observable<Room>;

  constructor(private route: ActivatedRoute, private store: Store<RoomState>) {
    this.room$ = this.store.pipe(select(getRoom));
  }
}
