import {
  connectedToSubscription,
  disconnectedFromSubscription,
} from '@app/core/subscription/actions/subscription.actions';
import { createReducer, on } from '@ngrx/store';

export const SUBSCRIPTION_STATE_TOKEN = 'subscription';

export enum SubscriptionStatus {
  CONNECTED,
  DISCONNECTED,
}

export interface SubscriptionState {
  status: SubscriptionStatus;
}

export const subscriptionInitialState: SubscriptionState = {
  status: SubscriptionStatus.DISCONNECTED,
};

export const subscriptionReducer = createReducer(
  subscriptionInitialState,
  on(
    connectedToSubscription,
    (state: SubscriptionState): SubscriptionState => ({
      ...state,
      status: SubscriptionStatus.CONNECTED,
    })
  ),
  on(
    disconnectedFromSubscription,
    (state: SubscriptionState): SubscriptionState => ({
      ...state,
      status: SubscriptionStatus.DISCONNECTED,
    })
  )
);
