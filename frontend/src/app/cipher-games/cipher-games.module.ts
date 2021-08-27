import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CipherGameListComponent } from './cipher-game-list/cipher-game-list.component';
import {RouterModule, Routes} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatRippleModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { PickGameComponent } from './pick-game/pick-game.component';
import { GameCardComponent } from './game-card/game-card.component';

const routes: Routes = [
  {path: '', component: CipherGameListComponent},
  {path: 'pick', component: PickGameComponent}
]

@NgModule({
  declarations: [
    CipherGameListComponent,
    PickGameComponent,
    GameCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatDatepickerModule
  ]
})
export class CipherGamesModule { }
