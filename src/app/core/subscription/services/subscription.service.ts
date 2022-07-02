import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { io, Socket } from 'socket.io-client';

import {
  connectedToSubscription,
  disconnectedFromSubscription,
} from '../actions/subscription.actions';
import { SubscriptionState } from '../reducers/subscription.reducer';

@Injectable()
export class SubscriptionService {
  private socket: Socket | undefined;

  constructor(private store: Store<SubscriptionState>) {}

  connect() {
    if (!this.socket) {
      this.socket = io('localhost:3000', {
        transports: ['websocket'],
      });
    }

    this.socket.on('connect', () => this.store.dispatch(connectedToSubscription()));
    this.socket.on('disconnect', () => this.store.dispatch(disconnectedFromSubscription()));
  }

  disconnect(){
    this.socket?.close();
  }
}
