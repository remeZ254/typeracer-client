import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { RaceComponent } from './components/race/race.component';
import { TrackComponent } from './components/track/track.component';
import { RoomComponent } from './container/room.component';
import { RoomRoutingModule } from './room-routing.module';

@NgModule({
  declarations: [RoomComponent, RaceComponent, TrackComponent],
  imports: [CommonModule, FormsModule, RoomRoutingModule, SharedModule],
})
export class RoomModule {}
