import { Injectable } from '@angular/core';
import { RoomState } from '@app/core/room/reducers/room.reducer';
import { RoomModes } from '@app/shared/models/room/room.model';
import { Store } from '@ngrx/store';

import {
  connectedToSubscription,
  disconnectedFromSubscription,
} from '@app/core/room/actions/room.actions';
import { Observable, Observer } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class RoomSubscriptionService {
  private socket: Socket;
  defaultEvent = 'room';

  constructor(private store: Store<RoomState>) {}

  connect(mode: RoomModes) {
    if (!this.socket || !this.socket.connected) {
      this.socket = io('localhost:3000', {
        transports: ['websocket'],
      });
    }

    this.socket.on('connect', () =>
      this.store.dispatch(connectedToSubscription({ socketId: this.socket.id, mode }))
    );
    this.socket.on('disconnect', () => this.store.dispatch(disconnectedFromSubscription()));
  }

  disconnect() {
    this.socket.close();
  }

  eventMessages$<T>(event: string = this.defaultEvent): Observable<T> {
    return new Observable((observer: Observer<T>) => {
      this.socket.on(event, (data: T) => observer.next(data));
      return this.socket.close.bind(this.socket);
    });
  }

  sendMessage<T>(event: string, props: T) {
    this.socket.emit(event, props);
  }
}
