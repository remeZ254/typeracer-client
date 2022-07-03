import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from '@app/features/room/container/room.component';

import { RoutesEnum } from '@app/shared/models/routes/routes.model';
import { AuthGuard } from './core/auth/guard/auth.guard';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';

const routes: Routes = [
  {
    path: RoutesEnum.HOME,
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: RoutesEnum.LOGIN,
    component: LoginComponent
  },
  {
    path: RoutesEnum.ROOM,
    component: RoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
