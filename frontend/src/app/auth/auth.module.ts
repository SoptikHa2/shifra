import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CanLogInGuard} from "../guards/can-log-in.guard";
import {CanRegisterGuard} from "../guards/can-register.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanLogInGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [CanRegisterGuard]
  }
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule
    ]
})
export class AuthModule {
}
