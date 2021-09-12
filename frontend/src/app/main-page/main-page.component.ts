import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  cipherRunning: boolean;
  svgImage: Observable<SafeHtml>;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.cipherRunning = (new Date('2021-10-2')).getTime() - Date.now() < 0;
    const headers = new HttpHeaders();
    headers.set('Accept', 'image/svg+xml')
    this.svgImage = this.http.get('/assets/backLogo.svg',
      {headers, responseType: 'text'})
      .pipe(map(res => this.sanitizer.bypassSecurityTrustHtml(res)));
  }

  ngOnInit(): void {
  }

}
