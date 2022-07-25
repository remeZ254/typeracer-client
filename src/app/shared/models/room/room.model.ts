export interface Room {
  id: string;
  status: RoomStatus;
  players: Player[];
  text: Quote;
  countdown: number;
  mode: RoomModes;
}

export enum RoomModes {
  PUBLIC = 'PUBLIC',
  PRACTICE = 'PRACTICE',
}

export const roomModeDisplayResolver: Record<RoomModes, string> = {
  [RoomModes.PRACTICE]: 'practice',
  [RoomModes.PUBLIC]: 'room',
};

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
  track: string;
}

export interface Quote {
  quote: string;
  author: string;
  category: string;
}
