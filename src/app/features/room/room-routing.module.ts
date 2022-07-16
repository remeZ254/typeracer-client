import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticeRoomComponent } from './containers/practice-room/practice-room.component';
import { PublicRoomComponent } from './containers/public-room/public-room.component';

const routes: Routes = [
  {
    path: 'practice',
    component: PracticeRoomComponent,
  },
  {
    path: '',
    component: PublicRoomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomRoutingModule {}
