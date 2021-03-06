import { Component, OnInit } from '@angular/core';
import {AuthService, userModel} from "../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  userObs: Observable<userModel | null>;

  constructor(
    private authService: AuthService
  ) {
    this.userObs = authService.user.asObservable();
  }

  ngOnInit(): void {
  }

  logInOut(inOut: boolean) {
    if (inOut) {
      this.authService.logout().then();
    } else {
      this.authService.promptToLogin();
    }
  }
}
