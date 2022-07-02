import { ActionCreator, Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Observable, Observer } from 'rxjs';
import { io, Socket } from 'socket.io-client';

export abstract class SubscriptionService {
  private socket: Socket | undefined;
  abstract defaultEvent: string;
  abstract connectedToSubscription: ActionCreator<any,()=>TypedAction<any>>;
  abstract disconnectedFromSubscription: ActionCreator<any,()=>TypedAction<any>>;

  protected constructor(private store: Store<any>) {}

  connect() {
    if (!this.socket) {
      this.socket = io('localhost:3000', {
        transports: ['websocket'],
      });
    }

    this.socket.on('connect', () => this.store.dispatch(this.connectedToSubscription()));
    this.socket.on('disconnect', () => this.store.dispatch(this.disconnectedFromSubscription()));
  }

  disconnect() {
    this.socket?.close();
  }

  eventMessages$<T>(event: string = this.defaultEvent): Observable<T> {
    return new Observable((observer: Observer<T>) => {
      this.socket?.on(event, (data: T) => observer.next(data));
      return this.socket?.close.bind(this.socket);
    });
  }
}
