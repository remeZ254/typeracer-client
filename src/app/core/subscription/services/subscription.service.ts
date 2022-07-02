import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class SubscriptionService {
  private socket: Socket | undefined;

  constructor() {}

  connect() {
    if (!this.socket) {
      this.socket = io('localhost:3000', {
        transports: ['websocket'],
      });
    }
  }
}
