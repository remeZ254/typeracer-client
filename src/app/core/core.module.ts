import { NgModule } from '@angular/core';
import { ThemeModule } from './theme/theme.module';
import { AuthModule } from './auth/auth.module';
import { RoomModule } from './room/room.module';

@NgModule({
  imports: [AuthModule, RoomModule, ThemeModule],
})
export class CoreModule {}
