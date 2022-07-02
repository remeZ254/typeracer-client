import { Room } from '@app/shared/models/room/room.model';
import { createAction, props } from '@ngrx/store';

enum RoomActions {
  CONNECT = '[Room] Connect',
  CONNECTED = '[Room] Connected',
  DISCONNECT = '[Room] Disconnect',
  DISCONNECTED = '[Room] Disconnected',
  NEW_ROOM_MESSAGE = '[Room] New Room Message',
}

export const connectToSubscription = createAction(RoomActions.CONNECT);
export const connectedToSubscription = createAction(RoomActions.CONNECTED);
export const disconnectFromSubscription = createAction(RoomActions.DISCONNECT);
export const disconnectedFromSubscription = createAction(RoomActions.DISCONNECTED);

export const newRoomMessage = createAction(
  RoomActions.NEW_ROOM_MESSAGE,
  props<{ room: Room }>()
);
