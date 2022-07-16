import {
  connectedToSubscription,
  disconnectedFromSubscription,
  newRoomMessage,
} from '@app/core/room/actions/room.actions';
import { Room, RoomStatus } from '@app/shared/models/room/room.model';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

export const ROOM_STATE_TOKEN = 'room';

export enum SubscriptionStatus {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
}

export interface RoomState {
  subscriptionStatus: SubscriptionStatus;
  socketId: string;
  room: Room;
}

export const roomInitialState: RoomState = {
  subscriptionStatus: SubscriptionStatus.DISCONNECTED,
  socketId: '',
  room: {
    id: '',
    status: RoomStatus.DONE,
    players: [],
    text: {
      quote: '',
      author: '',
      category: '',
    },
    countdown: -1,
  },
};

export const roomReducer = createReducer(
  roomInitialState,
  on(
    connectedToSubscription,
    (state: RoomState, { socketId }: { socketId: string }): RoomState => ({
      ...state,
      subscriptionStatus: SubscriptionStatus.CONNECTED,
      socketId,
    })
  ),
  on(disconnectedFromSubscription, (): RoomState => roomInitialState),
  on(
    newRoomMessage,
    (state: RoomState, { room }: { room: Room }): RoomState => ({
      ...state,
      room,
    })
  )
);

const getRoomState = createFeatureSelector<RoomState>(ROOM_STATE_TOKEN);

export const getRoom = createSelector(getRoomState, (roomState: RoomState) => roomState.room);

export const getRoomId = createSelector(getRoom, (room: Room) => room.id);

export const getSocketId = createSelector(
  getRoomState,
  (roomState: RoomState) => roomState.socketId
);

export const getRoomAuth = createSelector(
  getRoomId,
  getSocketId,
  (roomId: string, socketId: string) => ({
    roomId,
    socketId,
  })
);
