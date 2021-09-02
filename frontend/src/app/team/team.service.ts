import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of, throwError} from "rxjs";
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

  createTeam(name: string, cipher_game_id: number) : Observable<boolean> {
    return this.http.post(`${environment.backendUrl}/api/team`, {name, cipher_game_id})
      .pipe(
        map(() => true),
        catchError(err => {
          if (!environment.production) console.error(err);
          return of(false);
        })
      );
  }

  getTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(`${environment.backendUrl}/api/team/${id}`)
      .pipe(
        map(team => ({
          ...team,
          QRCode: this.getQRCodeLink(team.invite_code),
          inviteLink: `${environment.frontendUrl}/team/join?code=${team.invite_code}`
        })),
      );
  }

  private getQRCodeLink(code: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(
      `${environment.backendUrl}/api/generateTeamJoinQR/${code}`);
  }

  joinTeam(invite_code: string): Observable<number> {
    return this.http.post<number>(`${environment.backendUrl}/api/team/join`, {invite_code})
      .pipe(
        catchError((err) => {
          if (!environment.production) console.error(err);
          return throwError(err);
        })
      );
  }
}
