import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Cipher} from "../model/cipher";
import {Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Hint} from "../model/hint";
import {LoadingService} from "./loading.service";

@Injectable({
  providedIn: 'root'
})
export class CipherService {
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {
  }

  getVisibleCiphers(gameId: number): Observable<Cipher[]> {
    return this.loadingService.startLoading(
      this.http.get<Cipher[]>(environment.backendUrl + `/api/game/${gameId}/ciphers`)
        .pipe(catchError(this.handleError)));
  }

  getCipher(id: number) {
    return this.loadingService.startLoading(
      this.http.get<Cipher>(environment.backendUrl + `/api/cipher/${id}`)
        .pipe(catchError(this.handleError)));
  }

  makeAttempt(cipherId: number, answer: string) {
    return this.loadingService.startLoading(
      this.http.post(environment.backendUrl + `/api/cipher/${cipherId}/attempt`, {answer}, {observe: 'response'})
        .pipe(catchError((err: HttpErrorResponse) => {
          if (err.status == 417) {
            return throwError('Špatná odpověď!');
          }
          if (err.status == 420) {
            return throwError('Zpomal, odevzdáváš příliš rychle!');
          }
          if (err.status == 423) {
            return throwError('Pokusy byly již vyčerpány!');
          }
          if (err.status == 202) {
            return of(null);
          }

          if (err.status >= 500) {
            return throwError('Stala se chyba na straně serveru! Prosím kontaktujte nejbližšího organizátora.');
          }

          return throwError('Stala se neočekávaná chyba, zkuste prosím přenačíst stránku. V případě problému kontaktujte organizátora.');
        })));
  }

  openHint(id: number): Observable<Hint> {
    return this.loadingService.startLoading(
      this.http.post<Hint>(`${environment.backendUrl}/api/hint/${id}`, {}));
  }

  handleError(err: any) {
    if (!environment.production) console.error(err);
    return throwError(err);
  }
}
