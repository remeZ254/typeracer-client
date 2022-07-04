export interface Room {
  id: string;
  status: RoomStatus;
  players: Player[];
  text: Quote;
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

export interface Quote {
  quote: string;
  author: string;
  category: string;
}
