import { NgModule } from '@angular/core';

import { RoomModule } from './room/room.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [AuthModule, RoomModule],
})
export class CoreModule {}
