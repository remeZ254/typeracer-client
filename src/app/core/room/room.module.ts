import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RoomEffect } from './effects/room.effect';
import { RoomService } from '@app/core/room/services/room.service';
import { ROOM_STATE_TOKEN, roomReducer } from './reducers/room.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(ROOM_STATE_TOKEN, roomReducer),
    EffectsModule.forFeature([RoomEffect]),
  ],
  providers: [RoomService],
})
export class RoomModule {}
