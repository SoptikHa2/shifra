import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTeamComponent } from './create-team/create-team.component';
import {RouterModule, Routes} from "@angular/router";
import {TeamService} from "./team.service";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { TeamComponent } from './team.component';

const routes: Routes = [
  {path: 'create', component: CreateTeamComponent},
  {path: ':id', component: TeamComponent}
]

@NgModule({
  declarations: [
    CreateTeamComponent,
    TeamComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    TeamService
  ]
})
export class TeamModule { }
