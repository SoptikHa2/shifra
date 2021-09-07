import { Component, OnInit } from '@angular/core';
import {TeamService} from "./team.service";
import {Team} from "../model/team";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {AskDialogComponent} from "../dialogs/ask-dialog/ask-dialog.component";
import {skipWhile, tap} from "rxjs/operators";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  teamObs?: Observable<Team>;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.teamObs = this.teamService.getTeamById(this.route.snapshot.params['id']).pipe(tap(console.log));
  }

  leaveTeam() {
    this.dialog.open(AskDialogComponent,
      {data: {text: 'Opravdu chcete opustit team?'}})
      .afterClosed()
      .pipe(skipWhile(res => !res))
      .subscribe(res => {
        if (res) {
          alert("implementovat!")
          // todo: leave team (missing api)
        }
      });
  }
}
