import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {TeamService} from "../team/team.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JoinTeamGuard implements CanActivate {
  constructor(
    private teamService: TeamService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const code = route.queryParamMap.get('code')
    if (!code) return true;
    return this.teamService.joinTeam(code).pipe(map(res => {
      if (res) return `/team/${}`;
    }));
  }

}
