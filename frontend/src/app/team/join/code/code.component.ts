import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TeamService} from "../../team.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ValueConverter} from "@angular/compiler/src/render3/view/template";
import {AuthService} from "../../../services/auth.service";
import {LoadingService} from "../../../services/loading.service";
import {Observable} from "rxjs";
import {map, mergeMap, skip, skipWhile} from "rxjs/operators";

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss', '../../../theme/form-theme.scss']
})
export class CodeComponent implements OnInit {
  joinTeamForm: FormGroup;
  codeControl: FormControl;
  usernameControl: FormControl;

  constructor(
    private teamService: TeamService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router,
  ) {
    this.codeControl = new FormControl('', [Validators.required]);
    this.usernameControl = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(80)]);
    this.joinTeamForm = new FormGroup({
      code: this.codeControl,
      username: this.usernameControl
    });

    this.loadingService.startLoading(this.authService.user.asObservable().pipe(skipWhile(user => user == null)))
      .pipe(
        map(user => user!.loggedIn),
        mergeMap(loggedIn => {
          return this.loadingService.loading.asObservable()
            .pipe(map(loading => loading || loggedIn));
        })
      ).subscribe(res => {
        if (res) {
          this.usernameControl.disable();
          this.usernameControl.setValue(this.authService.user.value?.person.nickname);
        } else {
          this.usernameControl.enable();
        }
      });
  }

  ngOnInit(): void {

  }


  joinTeam() {
    this.teamService.joinTeam(this.codeControl.value)
      .then(success => {
        if (success) {
          this.router.navigate(['team']).then();
        } else {

        }
      });
  }

  usernameErrorMessage(): string | undefined {
    if (this.usernameControl.hasError('required'))
      return 'Požadováno';
    if (this.usernameControl.hasError('minlength'))
      return 'Uživatelské jméno musí mít alenpoň 4 znaky';
    if (this.usernameControl.hasError('maxlength'))
      return 'Uživatelské jméno musí mít nevíce 80 znaků';
    return undefined;
  }
}
