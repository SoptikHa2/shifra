import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import {CipherGameListComponent} from "./cipher-game-list/cipher-game-list.component";
import {MatIconModule} from "@angular/material/icon";
import {CipherGamesModule} from "../cipher-games/cipher-games.module";
import {Router, RouterModule, Routes} from "@angular/router";
import {GameCardModule} from "../game-card/game-card.module";
import {MatButtonModule} from "@angular/material/button";
import {CountdownComponent} from "./countdown/countdown.component";

const routes: Routes = [
  { path: '', component: MainPageComponent }
]

@NgModule({
  declarations: [
    MainPageComponent,
    CipherGameListComponent,
    CountdownComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(routes),
    GameCardModule,
    MatButtonModule
  ]
})
export class MainPageModule { }
