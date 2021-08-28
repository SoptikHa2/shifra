import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";
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
    // todo: uncomment once API is ready
    /*return this.http.get<Team>(`${environment.backendUrl}/api/team/${id}`)
      .pipe(
        map(team => ({
          ...team,
          QRCode: this.getQRCodeLink(team.invite_code),
          inviteLink: `${environment.backendUrl}/team/join?code=${team.invite_code}`
        }))
      );*/
    return of({
      name: 'team1',
      QRCode: this.sanitizer.bypassSecurityTrustUrl('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png'),
      invite_code: 'this is code',
      approved: true,
      inviteLink: `${environment.backendUrl}/team/join?code=${'this is code'}`,
      teamMax: 10,
      teamMates: [
        {nickname: 'Soptík'},
        {nickname: '333 stříbrných stříkaček'}
      ]
    });
  }

  private getQRCodeLink(code: string): SafeUrl {
    // todo: uncomment once API is ready
    //return this.sanitizer.bypassSecurityTrustUrl(
    //  `${environment.backendUrl}/api/generateTeamJoinQR/${code}`);
    return this.sanitizer.bypassSecurityTrustUrl('https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FQR_code&psig=AOvVaw0XKpRON6z_3IcFBhHXxTXh&ust=1629620256736000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPino9vWwfICFQAAAAAdAAAAABAD');
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
