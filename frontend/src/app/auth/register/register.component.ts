import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordMatcher} from "../../validators/password.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth-common.scss', './register.component.scss']
})
export class RegisterComponent implements OnInit {
  error: string | undefined;
  addingUser: boolean = false;
  registerFormGroup: FormGroup;

  username: FormControl;
  email: FormControl;
  password: FormControl;
  rePassword: FormControl;

  usernameError: string | undefined;
  emailError: string | undefined;
  passwordError: string | undefined;
  rePasswordError: string | undefined;

  constructor(
    private authService: AuthService
  ) {
    this.username = new FormControl('',
      [Validators.required, Validators.minLength(4), Validators.maxLength(80)]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('',
      [Validators.required, Validators.minLength(6), Validators.maxLength(100)]);
    this.rePassword = new  FormControl('', [Validators.required, PasswordMatcher]);

    this.registerFormGroup = new FormGroup({
      username: this.username,
      email: this.email,
      password: this.password,
      re_password: this.rePassword
    })
  }

  ngOnInit(): void {
  }

  register() {
    this.addingUser = true;
    this.authService.register(this.username.value, this.email.value, this.password.value)
      .then(isSuccessful => {
          if (isSuccessful) {
            this.authService.returnFromPromotedLogin();
          } else {
            this.error = this.authService.getError();
          }
          this.addingUser = false;
        }
      );
  }

  usernameErrorMessage(): string | undefined {
    if (this.username.hasError('required'))
      return 'Požadováno';
    if (this.username.hasError('minlength'))
      return 'Uživatelské jméno musí mít alenpoň 4 znaky';
    if (this.username.hasError('maxlength'))
      return 'Uživatelské jméno musí mít nevíce 80 znaků';
    return undefined;
  }

  emailErrorMessage(): string | undefined {
    if (this.email.hasError('required'))
      return 'Požadováno';
    if (this.email.hasError('email'))
      return 'Neplatný email';
    return undefined;
  }

  passwordErrorMessage(): string | undefined {
    if (this.password.hasError('required'))
      return 'Požadováno';
    if (this.password.hasError('minlength'))
      return 'Heslo musí mít alespoň 6 znaků'
    if (this.password.hasError('maxlength'))
      return 'Heslo musí mít nejvíce 100 znaků'
    return undefined;
  }

  rePasswordErrorMessage(): string | undefined {
    if (this.rePassword.hasError('required'))
      return 'Požadováno';
    if (this.rePassword.hasError('passwordNoMatch'))
      return 'Hesla se neshodují';
    return undefined;
  }
}
