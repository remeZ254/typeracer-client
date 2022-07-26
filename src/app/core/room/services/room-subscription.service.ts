import { Injectable } from '@angular/core';

import {
  connectedToSubscription,
  connectingToSubscription,
  disconnectedFromSubscription,
} from '@app/core/room/actions/room.actions';
import {
  getSubscriptionStatus,
  RoomState,
  SubscriptionStatus,
} from '@app/core/room/reducers/room.reducer';
import { ConfigService } from '@app/services/config.service';
import { RoomModes } from '@app/shared/models/room/room.model';
import { environment } from '@environments/environment';
import { select, Store } from '@ngrx/store';
import { filter, first, Observable, Observer } from 'rxjs';
import { connect, Socket } from 'socket.io-client';

@Injectable()
export class RoomSubscriptionService {
  private socket: Socket;
  private readonly defaultEvent = 'room';

  constructor(private store: Store<RoomState>, private configService: ConfigService) {}

  connect(mode: RoomModes) {
    this.store
      .pipe(
        select(getSubscriptionStatus),
        first(),
        filter(
          (subscriptionStatus: SubscriptionStatus) =>
            subscriptionStatus !== SubscriptionStatus.CONNECTING
        )
      )
      .subscribe(() => {
        this.store.dispatch(connectingToSubscription());

        if (!this.socket || !this.socket.connected) {
          this.socket = connect(
            environment.production ? window.location.host : this.configService.get('socketUrl'),
            {
              transports: ['websocket'],
            }
          );
        }

        this.socket.on('disconnect', () => this.store.dispatch(disconnectedFromSubscription()));
        this.socket.on('connect', () =>
          this.store.dispatch(connectedToSubscription({ socketId: this.socket.id, mode }))
        );
      });
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
