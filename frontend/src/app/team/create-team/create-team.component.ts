import { Component, OnInit } from '@angular/core';
import {TeamService} from "../team.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss', '../../theme/form-theme.scss']
})
export class CreateTeamComponent implements OnInit {
  createTeamForm: FormGroup;
  teamName: FormControl;

  constructor(
    private teamService: TeamService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.teamName = new FormControl('',
      [Validators.required, Validators.minLength(4), Validators.maxLength(80)]);

    this.createTeamForm = new FormGroup({
      name: this.teamName
    });
  }

  ngOnInit(): void {
  }

  createTeam() {
    const id = this.route.snapshot.params['id'];
    this.teamService.createTeam(this.teamName.value, id)
      .subscribe((success) => {
        if (success) {
          this.router.navigate([`/team/${id}`]).then();
        }
      });
  }

  teamNameErrorMessage() {
    if (this.teamName.hasError('required')) {
      return 'Požadováno';
    } else if (this.teamName.hasError('minlength')) {
      return 'Název teamu musí mít alespoň 4 znaky';
    } else if (this.teamName.hasError('maxlength')) {
      return 'Název teamu může mít nejvíce 80 znaků';
    }
    return undefined;
  }
}
