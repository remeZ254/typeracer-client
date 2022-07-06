import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomComponent } from './container/room.component';
import { RaceComponent } from './components/race/race.component';
import { TrackComponent } from './components/track/track.component';

@NgModule({
  declarations: [RoomComponent, RaceComponent, TrackComponent],
  imports: [CommonModule, FormsModule],
})
export class RoomModule {}
