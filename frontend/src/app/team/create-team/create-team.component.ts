import { Component, OnInit } from '@angular/core';
import {TeamService} from "../team.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss', '../../theme/form-theme.scss']
})
export class CreateTeamComponent implements OnInit {
  createTeamForm: FormGroup;
  teamName: FormControl;

  constructor(private teamService: TeamService) {
    this.teamName = new FormControl('',
      [Validators.required, Validators.minLength(4), Validators.maxLength(80)]);

    this.createTeamForm = new FormGroup({
      name: this.teamName
    });
  }

  ngOnInit(): void {
  }

  createTeam() {
    this.teamService.createTeam(this.teamName.value);
  }
}
