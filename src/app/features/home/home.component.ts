import { Component, ViewEncapsulation } from '@angular/core';

import { AuthService } from '@app/core/auth/service/auth.service';
import { connectToSubscription } from '@app/core/room/actions/room.actions';
import { RoomState } from '@app/core/room/reducers/room.reducer';
import { RoomModes } from '@app/shared/models/room/room.model';
import { HotkeysService } from '@app/shared/services/hotkeys/hotkeys.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HotkeysService],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  readonly auth: string;
  readonly RoomModes = RoomModes;
  private readonly enterPracticeRace = {
    name: 'Enter a practice race',
    action: () => this.enterRace(RoomModes.PRACTICE),
    key: 'O',
    altKey: true,
    ctrlKey: true
  };
  private readonly enterPublicRace = {
    name: 'Enter a public race',
    action: () => this.enterRace(RoomModes.PUBLIC),
    key: 'I',
    altKey: true,
    ctrlKey: true
  };

  constructor(
    private authService: AuthService,
    private store: Store<RoomState>,
    private hotkeysService: HotkeysService
  ) {
    this.auth = authService.getAuth();
    this.hotkeysService.addHotkey(this.enterPracticeRace);
    this.hotkeysService.addHotkey(this.enterPublicRace);
  }

  enterRace(mode: RoomModes) {
    this.store.dispatch(connectToSubscription({ mode }));
  }
}
