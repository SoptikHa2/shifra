import { Component, OnInit } from '@angular/core';
import {AuthService, errorMessage} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../theme/form-theme.scss']
})
export class LoginComponent implements OnInit {
  error?: errorMessage;
  loggingIn: boolean = false;
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
    this.loggingIn = true;
    this.authService.login(this.loginFormGroup.value.username, this.loginFormGroup.value.password)
      .then(wasSuccessful => {
        if (wasSuccessful) {
          this.authService.returnFromPromotedLogin();
        } else {
          this.error = this.authService.getError();
          if (this.error == "Nesprávné heslo nebo uživatelské jméno")
            this.loginFormGroup.reset();
        }
        this.loggingIn = false;
      });
  }
}
