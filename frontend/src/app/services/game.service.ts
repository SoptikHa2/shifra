import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Game} from "../model/game";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {Team} from "../model/team";
import {LoadingService} from "./loading.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) { }

  getGames(): Observable<[Game, Team | null][]> {
    return this.loadingService.startLoading(this.http.get<[Game, Team | null][]>(environment.backendUrl + '/api/games')
      .pipe(catchError(this.handleError)));
  }

  getGameById(id: number): Observable<Game> {
    return this.loadingService.startLoading(this.http.get<Game>( `${environment.backendUrl}/api/game/${id}`)
      .pipe(catchError(this.handleError)));
  }

  handleError(err: any) {
    if (!environment.production) console.error(err);
    return throwError(err);
  }
}
