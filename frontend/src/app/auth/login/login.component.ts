import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth-common.scss']
})
export class LoginComponent implements OnInit {
  error: string | undefined;
  loginFormGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginFormGroup = formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.loginFormGroup.value.username, this.loginFormGroup.value.password)
      .then(wasSuccessful => {
        if (wasSuccessful) {
          this.authService.returnFromPromotedLogin();
        } else {
          // todo: show API error
        }
      });
  }
}
