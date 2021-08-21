import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Team} from "../model/team";
import {Injectable} from "@angular/core";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  createTeam(name: string) : Observable<boolean> {
    return this.http.post(`${environment.backendUrl}/api/team` + '', {name})
      .pipe(
        map(() => true),
        catchError(err => {
          if (!environment.production) console.error(err);
          return of(false);
        })
      );
  }

  getTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(`${environment.backendUrl}/api/team/${id}`);
  }

  updateTeam(id: number, name: string): Observable<boolean> {
    return this.http.put(`${environment.backendUrl}/api/team/${id}`, {name})
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  getQRCodeLink(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(
      `${environment.backendUrl}/api/generateTeamJoinQR/Ahoj Pepíčku Jak`);
  }
}
