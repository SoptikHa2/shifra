import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { PickGameComponent } from './pick-game/pick-game.component';
import {GameCardModule} from "../game-card/game-card.module";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  {path: 'pick', component: PickGameComponent}
]

@NgModule({
  declarations: [
    PickGameComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GameCardModule,
    MatButtonModule,
  ]
})
export class CipherGamesModule { }
