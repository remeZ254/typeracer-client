import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutesEnum } from './shared/models/routes/routes.model';
import { AuthGuard } from './core/auth/guard/auth.guard';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';

const routes: Routes = [
  {
    path: RoutesEnum.HOME,
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: RoutesEnum.LOGIN,
    component: LoginComponent,
  },
  {
    path: RoutesEnum.ROOM,
    loadChildren: () => import('./features/room/room.module').then(({ RoomModule }) => RoomModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: RoutesEnum.HOME,
  },
  {
    path: '**',
    redirectTo: RoutesEnum.HOME,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
