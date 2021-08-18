import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTeamComponent } from './create-team/create-team.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: 'create', component: CreateTeamComponent}
]

@NgModule({
  declarations: [
    CreateTeamComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TeamModule { }
