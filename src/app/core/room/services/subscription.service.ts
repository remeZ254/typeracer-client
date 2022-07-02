import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Observer } from 'rxjs';
import { io, Socket } from 'socket.io-client';

import {
  connectedToSubscription,
  disconnectedFromSubscription,
} from '../actions/room.actions';
import { RoomState } from '../reducers/room.reducer';

@Injectable()
export class SubscriptionService {
  private socket: Socket | undefined;

  constructor(private store: Store<RoomState>) {}

  connect() {
    if (!this.socket) {
      this.socket = io('localhost:3000', {
        transports: ['websocket'],
      });
    }

    this.socket.on('connect', () => this.store.dispatch(connectedToSubscription()));
    this.socket.on('disconnect', () => this.store.dispatch(disconnectedFromSubscription()));
  }

  disconnect() {
    this.socket?.close();
  }

  eventMessages$<T>(event: string): Observable<T> {
    return new Observable((observer: Observer<T>) => {
      this.socket?.on(event, (data: T) => observer.next(data));
      return this.socket?.close.bind(this.socket);
    });
  }
}
