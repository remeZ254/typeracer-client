import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService } from '@app/core/auth/service/auth.service';
import { connectToSubscription } from '@app/core/room/actions/room.actions';
import { RoomState } from '@app/core/room/reducers/room.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly auth: string;

  constructor(private authService: AuthService, private store: Store<RoomState>) {
    this.auth = authService.getAuth();
  }

  enterRace() {
    this.store.dispatch(connectToSubscription());
  }
}
