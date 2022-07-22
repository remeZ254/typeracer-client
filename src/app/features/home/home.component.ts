import { Component, ViewEncapsulation } from '@angular/core';

import { AuthService } from '@app/core/auth/service/auth.service';
import { connectToSubscription } from '@app/core/room/actions/room.actions';
import { RoomState } from '@app/core/room/reducers/room.reducer';
import { RoomModes } from '@app/shared/models/room/room.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  readonly auth: string;
  readonly RoomModes = RoomModes;

  constructor(private authService: AuthService, private store: Store<RoomState>) {
    this.auth = authService.getAuth();
  }

  enterRace(mode: RoomModes) {
    this.store.dispatch(connectToSubscription({ mode }));
  }
}
