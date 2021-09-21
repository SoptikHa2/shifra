import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {Observable, of, throwError} from "rxjs";
import {Team} from "../model/team";
import {Injectable} from "@angular/core";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {LoadingService} from "../services/loading.service";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private loadingService: LoadingService
  ) { }

  createTeam(team_name: string, cipher_game_id: number) : Observable<number> {
    return this.http.post<number>(`${environment.backendUrl}/api/team/create`, {},
      {params: {cipher_game_id, team_name}})
      .pipe(
        catchError(err => {
          if (!environment.production) console.error(err);
          return throwError(err);
        })
      );
  }

  getTeamById(id: number): Observable<Team> {
    const teamObs = this.http.get<Team>(`${environment.backendUrl}/api/team/${id}`)
      .pipe(
        map(team => ({
          ...team,
          QRCode: this.getQRCodeLink(team.invite_code),
          inviteLink: `${environment.frontendUrl}/team/join?code=${team.invite_code}`
        })),
      );

    return this.loadingService.startLoading(teamObs);
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

  leaveTeam(team_id: number) {
    return this.http.delete(`${environment.backendUrl}/api/team/leave/${team_id}`)
      .pipe(
        catchError((err) => {
          if (!environment.production) console.error(err);
          return throwError(err);
        })
      )
  }
}
