import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RoomEffect } from './effects/room.effect';
import { RoomSubscriptionService } from './services/room-subscription.service';
import { ROOM_STATE_TOKEN, roomReducer } from './reducers/room.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(ROOM_STATE_TOKEN, roomReducer),
    EffectsModule.forFeature([RoomEffect]),
  ],
  providers: [RoomSubscriptionService],
})
export class RoomModule {}
