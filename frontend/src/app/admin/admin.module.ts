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
import { CipherComponent } from './cipher/cipher.component';
import {MatListModule} from "@angular/material/list";
import { HintComponent } from './hint/hint.component';
import { AddHintComponent } from './add-hint/add-hint.component';
import {CipherExistsGuard} from "../guards/cipher-exists.guard";
import {MatIconModule} from "@angular/material/icon";
import { GameComponent } from './game/game.component';

const routes: Routes = [
  {
    path: 'add-game',
    component: AddGameComponent
  },
  {
    path: 'game/:id',
    component: GameComponent
  },
  {
    path: 'add-cipher/:id',
    component: AddCipherComponent
  },
  {
    path: 'cipher/:id',
    component: CipherComponent
  },
  {
    path: 'hint/:id',
    component: HintComponent
  },
  {
    path: 'add-hint/:id',
    component: AddHintComponent,
    canActivate: [CipherExistsGuard]
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
    AddCipherComponent,
    CipherComponent,
    HintComponent,
    AddHintComponent,
    GameComponent
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
    MatListModule,
    MatIconModule,
  ],
  providers: [
    CipherService,
    GameService
  ]
})
export class AdminModule { }
