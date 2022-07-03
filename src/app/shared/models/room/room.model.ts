export interface Room {
  id: string;
  status: RoomStatus;
  players: Player[];
  words: string[];
}

export enum RoomStatus {
  QUEUED = 'QUEUED',
  ACTIVE = 'ACTIVE',
  DONE = 'DONE',
}

export interface Player {
  socketId: string;
  nickName: string;
  completedWords: number;
  wpm: number;
}
