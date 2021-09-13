import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { PickGameComponent } from './pick-game/pick-game.component';
import {GameCardModule} from "../game-card/game-card.module";
import {MatButtonModule} from "@angular/material/button";
import { DetailComponent } from './detail/detail.component';
import {MarkdownModule} from "ngx-markdown";
import {AttributeModule} from "../attribute/attribute.module";

const routes: Routes = [
  {path: 'pick', component: PickGameComponent},
  {path: 'detail/:id', component: DetailComponent}
]

@NgModule({
  declarations: [
    PickGameComponent,
    DetailComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        GameCardModule,
        MatButtonModule,
        MarkdownModule,
        AttributeModule,
    ]
})
export class CipherGamesModule { }
