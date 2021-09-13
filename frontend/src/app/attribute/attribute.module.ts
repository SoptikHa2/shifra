import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AttributeComponent} from "./attribute.component";
import {MatIconModule} from "@angular/material/icon";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AttributeComponent
  ],
  exports: [
    AttributeComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ClipboardModule,
    MatTooltipModule,
    MatSnackBarModule
  ]
})
export class AttributeModule { }
