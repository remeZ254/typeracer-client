import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import {
  connectedToSubscription,
  disconnectedFromSubscription,
  newRoomMessage
} from '@app/core/room/actions/room.actions';
import { Room, RoomStatus } from '@app/shared/models/room/room.model';

export const ROOM_STATE_TOKEN = 'room';

export enum SubscriptionStatus {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
}

export interface RoomState {
  subscriptionStatus: SubscriptionStatus;
  room: Room;
}

export const roomInitialState: RoomState = {
  subscriptionStatus: SubscriptionStatus.DISCONNECTED,
  room: {
    id: '',
    status: RoomStatus.DONE,
    players: [],
    text: {
      quote: '',
      author: '',
      category: ''
    }
  }
};

export const roomReducer = createReducer(
  roomInitialState,
  on(
    connectedToSubscription,
    (state: RoomState): RoomState => ({
      ...state,
      subscriptionStatus: SubscriptionStatus.CONNECTED
    })
  ),
  on(
    disconnectedFromSubscription,
    (state: RoomState): RoomState => ({
      ...state,
      subscriptionStatus: SubscriptionStatus.DISCONNECTED
    })
  ),
  on(
    newRoomMessage,
    (state: RoomState, { room }: { room: Room }): RoomState => ({
      ...state,
      room
    })
  )
);

const getRoomState = createFeatureSelector<RoomState>(ROOM_STATE_TOKEN);

export const getRoom = createSelector(getRoomState, (roomState: RoomState) => roomState.room);

export const getRoomId = createSelector(getRoom, (room: Room) => room.id);
