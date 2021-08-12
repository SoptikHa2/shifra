import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CipherGameListComponent } from './cipher-game-list/cipher-game-list.component';
import {RouterModule, Routes} from "@angular/router";
import {MatCardModule} from "@angular/material/card";

const routes: Routes = [
  {path: '', component: CipherGameListComponent}
]

@NgModule({
  declarations: [
    CipherGameListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule
  ]
})
export class CipherGamesModule { }
