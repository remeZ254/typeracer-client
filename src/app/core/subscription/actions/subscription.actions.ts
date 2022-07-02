import { createAction } from '@ngrx/store';

enum SubscriptionActions {
  CONNECT = '[Subscription] Connect',
  CONNECTED = '[Subscription] Connected',
  DISCONNECT = '[Subscription] Disconnect',
  DISCONNECTED = '[Subscription] Disconnected',
}

export const connectToSubscription = createAction(SubscriptionActions.CONNECT);

export const connectedToSubscription = createAction(SubscriptionActions.CONNECTED);

export const disconnectFromSubscription = createAction(SubscriptionActions.DISCONNECT);

export const disconnectedFromSubscription = createAction(SubscriptionActions.DISCONNECTED);
