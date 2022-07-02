import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  connectedToSubscription,
  disconnectedFromSubscription,
} from '@app/core/room/actions/room.actions';
import { SubscriptionService } from '@app/core/services/subscription.service';

@Injectable()
export class RoomService extends SubscriptionService {
  defaultEvent = 'room';
  connectedToSubscription = connectedToSubscription;
  disconnectedFromSubscription = disconnectedFromSubscription;

  constructor(store: Store<RoomService>) {
    super(store);
  }
}
