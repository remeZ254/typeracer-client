import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Room } from '@app/shared/models/room/room.model';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrackComponent {
  @Input() playerId: string;
  @Input() room: Room;

  getTrackIcon(airTrack: string): string {
    return `assets/svg/airtracks/${airTrack}.svg`;
  }

  rankResolver(rank: number): string {
    return `${rank}${[undefined, 'st', 'nd', 'rd'][(rank / 10) % 10 ^ 1 && rank % 10] || 'th'} place`;
  }
}
