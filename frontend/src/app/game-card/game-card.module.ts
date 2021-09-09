import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameCardComponent} from "./game-card.component";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    GameCardComponent
  ],
  exports: [
    GameCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class GameCardModule { }
