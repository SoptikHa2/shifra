import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {MatNativeDateModule} from "@angular/material/core";
import {MarkdownModule, MarkedOptions} from "ngx-markdown";
import {FormsModule} from "@angular/forms";
import { MenuComponent } from './menu/menu.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { AskDialogComponent } from './dialogs/ask-dialog/ask-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AskDialogComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatNativeDateModule,
        MarkdownModule.forRoot(),
        FormsModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        MatDialogModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
