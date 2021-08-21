import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoggedInGuard} from "./guards/logged-in.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./cipher-games/cipher-games.module').then(m => m.CipherGamesModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'cipher',
    loadChildren: () => import('./cipher/cipher.module').then(m => m.CipherModule)
  },
  {
    path: 'team',
    loadChildren: () => import('./team/team.module').then(m => m.TeamModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
