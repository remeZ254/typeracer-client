import { AirTracks } from '@app/shared/models/airtracks/airtracks.model';

export interface Room {
  id: string;
  status: RoomStatus;
  players: Player[];
  text: Quote;
  countdown: number;
}

export enum RoomStatus {
  QUEUED = 'QUEUED',
  ACTIVE = 'ACTIVE',
  DONE = 'DONE',
}

export interface Player {
  socketId: string;
  nickName: string;
  wordIndex: number;
  wpm: number;
  track: AirTracks;
}

export interface Quote {
  quote: string;
  author: string;
  category: string;
}
