import { Room, RoomModes } from '@app/shared/models/room/room.model';
import { createAction, props } from '@ngrx/store';

enum RoomActions {
  CONNECT = '[Room] Connect',
  CONNECTING = '[Room] Connecting',
  CONNECTED = '[Room] Connected',
  DISCONNECT = '[Room] Disconnect',
  DISCONNECTED = '[Room] Disconnected',
  NEW_ROOM_MESSAGE = '[Room] New Room Message',
  SEND_PLAYER_UPDATE = '[Room] Send Player Update',
  PLAY_AGAIN = '[Room] Play Again',
  EXIT_ROOM = '[Room] Exit Room'
}

export const connectToSubscription = createAction(
  RoomActions.CONNECT,
  props<{ mode: RoomModes }>()
);

export const connectingToSubscription = createAction(RoomActions.CONNECTING);

export const connectedToSubscription = createAction(
  RoomActions.CONNECTED,
  props<{ socketId: string; mode: RoomModes }>()
);

export const disconnectFromSubscription = createAction(RoomActions.DISCONNECT);

export const disconnectedFromSubscription = createAction(RoomActions.DISCONNECTED);

export const newRoomMessage = createAction(RoomActions.NEW_ROOM_MESSAGE, props<{ room: Room }>());

export const sendPlayerUpdate = createAction(
  RoomActions.SEND_PLAYER_UPDATE,
  props<{ wordIndex: number }>()
);

export const playAgain = createAction(RoomActions.PLAY_AGAIN, props<{ mode: RoomModes }>());

export const exitRoom = createAction(RoomActions.EXIT_ROOM);
