import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { RoomRoutingModule } from './room-routing.module';
import { PublicRoomComponent } from './containers/public-room/public-room.component';
import { RaceComponent } from './components/race/race.component';
import { TrackComponent } from './components/track/track.component';

@NgModule({
  declarations: [
    PublicRoomComponent,
    RaceComponent,
    TrackComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RoomRoutingModule,
    SharedModule
  ],
})
export class RoomModule {}
