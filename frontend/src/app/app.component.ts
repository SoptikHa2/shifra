import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {LoadingService} from "./services/loading.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: Observable<boolean>;

  constructor(
    private loadingService: LoadingService
  ) {
    this.loading = this.loadingService.loading.asObservable();
  }
}
