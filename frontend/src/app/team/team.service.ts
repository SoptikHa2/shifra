import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Team} from "../model/team";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

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

  getQRCodeLink(): string {
    return `${environment.backendUrl}/api/generateTeamJoinQR/Ahoj%20Pep%C3%ADku%20Jak`;
  }
}
