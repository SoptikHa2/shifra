import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CipherComponent } from './cipher.component';
import {RouterModule, Routes} from "@angular/router";
import {MarkdownModule} from "ngx-markdown";
import {FormsModule} from "@angular/forms";
import { CipherListComponent } from './cipher-list/cipher-list.component';
import {MatIconModule} from "@angular/material/icon";
import {MatRippleModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";

const routes: Routes = [
  {
    path: ':id',
    component: CipherComponent
  },
  {
    path: 'visible/:id',
    component: CipherListComponent
  }
]

@NgModule({
  declarations: [
    CipherComponent,
    CipherListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MarkdownModule,
    FormsModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule
  ]
})
export class CipherModule { }
