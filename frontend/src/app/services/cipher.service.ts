import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Cipher} from "../model/cipher";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Hint} from "../model/hint";

@Injectable({
  providedIn: 'root'
})
export class CipherService {

  constructor(
    private http: HttpClient
  ) { }

  getVisibleCiphers(gameId: number) : Observable<Cipher[]> {
    return this.http.get<Cipher[]>(environment.backendUrl + `/api/game/${gameId}/ciphers`)
      .pipe(catchError(this.handleError));
  }

  getCipher(id: number) {
    return this.http.get<Cipher>(environment.backendUrl + `/api/cipher/${id}`)
      .pipe(catchError(this.handleError));
  }

  makeAttempt(teamId: number, cipherId: number, answer: string) {
    return this.http.post(environment.backendUrl + `/api/cipher/${cipherId}`, {teamId, answer});
  }

  openHint(id: number): Observable<Hint> {
    return this.http.post<Hint>(`${environment.backendUrl}/api/hint/${id}`, {});
  }

  handleError(err: any) {
    if (!environment.production) console.error(err);
    return throwError(err);
  }
}
