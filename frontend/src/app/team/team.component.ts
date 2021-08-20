import { Component, OnInit } from '@angular/core';
import {TeamService} from "./team.service";
import {Team} from "../model/team";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  teamObs?: Observable<Team>;
  qrCodeUrl?: string;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.teamObs = this.teamService.getTeamById(this.route.snapshot.params['id']);
    this.qrCodeUrl = this.teamService.getQRCodeLink();
  }
}
