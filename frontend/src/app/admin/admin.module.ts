import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {RouterModule, Routes} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MarkdownModule} from "ngx-markdown";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {CipherService} from "../services/admin/cipher.service";
import {GameService} from "../services/admin/game.service";
import { AddGameComponent } from './add-game/add-game.component';
import { AddCipherComponent } from './add-cipher/add-cipher.component';

const routes: Routes = [
  {
    path: 'add-game',
    component: AddGameComponent
  },
  {
    path: 'add-cipher-to-game/:id',
    component: AddCipherComponent
  },
  {
    path: '',
    component: AdminComponent
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    AddGameComponent,
    AddCipherComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MarkdownModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [
    CipherService,
    GameService
  ]
})
export class AdminModule { }
