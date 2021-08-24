import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainMenuComponent} from './main-menu.component';
import {MatRippleModule} from "@angular/material/core";
import {RouterModule, Routes} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  {path: '', component: MainMenuComponent}
]

@NgModule({
  declarations: [
    MainMenuComponent
  ],
    imports: [
        CommonModule,
        MatRippleModule,
        RouterModule.forChild(routes),
        MatIconModule
    ]
})
export class MainMenuModule {
}
