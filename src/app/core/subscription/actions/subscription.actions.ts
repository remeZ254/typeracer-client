import { createAction } from '@ngrx/store';

enum SubscriptionActions {
  CONNECT = '[Subscription] Connect',
  CONNECTED = '[Subscription] Connected'
}

export const connectToSubscription = createAction(SubscriptionActions.CONNECT);

export const connectedToSubscription = createAction(SubscriptionActions.CONNECTED);
