import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CipherComponent } from './cipher.component';
import {RouterModule, Routes} from "@angular/router";
import {MarkdownModule} from "ngx-markdown";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {path: ':id', component: CipherComponent},
  {path: '', redirectTo: '/'}
]

@NgModule({
  declarations: [
    CipherComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MarkdownModule,
        FormsModule
    ]
})
export class CipherModule { }
