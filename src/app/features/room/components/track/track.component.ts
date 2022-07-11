import { Component, Input } from '@angular/core';
import { Room } from '@app/shared/models/room/room.model';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent {
  @Input() playerId!: string;
  @Input() room!: Room;
}
