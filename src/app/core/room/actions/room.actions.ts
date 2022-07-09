import { Room } from '@app/shared/models/room/room.model';
import { createAction, props } from '@ngrx/store';

enum RoomActions {
  CONNECT = '[Room] Connect',
  CONNECTED = '[Room] Connected',
  DISCONNECT = '[Room] Disconnect',
  DISCONNECTED = '[Room] Disconnected',
  NEW_ROOM_MESSAGE = '[Room] New Room Message',
  SEND_PLAYER_UPDATE = '[Room] Send Player Update',
}

export const connectToSubscription = createAction(RoomActions.CONNECT);
export const connectedToSubscription = createAction(
  RoomActions.CONNECTED,
  props<{ socketId: string }>()
);
export const disconnectFromSubscription = createAction(RoomActions.DISCONNECT);
export const disconnectedFromSubscription = createAction(RoomActions.DISCONNECTED);

export const newRoomMessage = createAction(RoomActions.NEW_ROOM_MESSAGE, props<{ room: Room }>());

export const sendPlayerUpdate = createAction(
  RoomActions.SEND_PLAYER_UPDATE,
  props<{ wordIndex: number }>()
);
