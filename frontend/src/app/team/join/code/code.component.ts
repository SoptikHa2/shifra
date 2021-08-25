import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TeamService} from "../../team.service";

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss', '../../../theme/form-theme.scss']
})
export class CodeComponent implements OnInit {
  joinTeamForm: FormGroup;
  codeControl: FormControl;

  constructor(
    private teamService: TeamService
  ) {
    this.codeControl = new FormControl('', [Validators.required]);
    this.joinTeamForm = new FormGroup({
      code: this.codeControl
    });
  }

  ngOnInit(): void {
  }

  joinTeam() {
    //this.teamService.
  }
}
