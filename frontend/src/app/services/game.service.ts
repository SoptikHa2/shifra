import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Game} from "../model/game";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {Team} from "../model/team";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getGames(): Observable<[Game, Team | null][] | null> {
    return this.http.get<[Game, Team | null][]>(environment.backendUrl + '/api/games')
      .pipe(catchError(this.handleError));
  }

  getGameById(id: number) {
    return this.http.get<Game>( `${environment.backendUrl}/api/game/${id}`)
      .pipe(catchError(this.handleError));
  }

  handleError(err: any) {
    if (!environment.production) console.error(err);
    return of(null);
  }
}
