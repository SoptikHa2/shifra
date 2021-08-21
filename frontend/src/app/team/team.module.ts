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
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {MatRippleModule} from "@angular/material/core";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { AttributeComponent } from './attribute/attribute.component';
import {LoggedInGuard} from "../guards/logged-in.guard";

const routes: Routes = [
  {
    path: 'create',
    component: CreateTeamComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: ':id',
    component: TeamComponent // todo: add is team participant Guard
  }
]

@NgModule({
  declarations: [
    CreateTeamComponent,
    TeamComponent,
    AttributeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ClipboardModule,
    MatRippleModule,
    MatSnackBarModule
  ],
  providers: [
    TeamService
  ]
})
export class TeamModule { }
