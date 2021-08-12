import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CipherGameListComponent } from './cipher-game-list/cipher-game-list.component';
import {RouterModule, Routes} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatRippleModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";

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
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatDatepickerModule
  ]
})
export class CipherGamesModule { }
