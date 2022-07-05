import { Room, RoomStatus } from '@app/shared/models/room/room.model';

export const roomMock: Room = {
  id: '6c6c4ba4-f55d-4a3b-b48f-7712a83e76b7',
  status: RoomStatus.QUEUED,
  players: [
    { socketId: 'elZDsf3dieqeGgsfAAA3', nickName: 'Guest', wordIndex: 0, wpm: 0 },
    {
      socketId: 'nKq6kK31AKCqt53pAABP',
      nickName: 'itypeforbyron',
      wordIndex: 26,
      wpm: 80,
    },
  ],
  text: {
    quote:
      'Ive seen it watching me, ' +
      'that misty thing without a face. ' +
      'It weaves my thoughts, ' +
      'lined them up in black lace. ' +
      'It buries my shape and leaves no trace. ' +
      'Tomorrow I will have no shame, ' +
      'and I will start again.',
    author: 'zemer',
    category: 'mocks',
  },
};
