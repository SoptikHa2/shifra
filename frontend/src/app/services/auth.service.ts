import {Injectable} from '@angular/core';
import {Person} from "../model/person";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<Person | null> = new BehaviorSubject<Person | null>(null);

  constructor(private http: HttpClient) {

  }

  /**
   * Tries to login using username and password
   * In case of success fills user attribute with user data
   * @param username
   * @param password
   */
  async login(username: string, password: string): Promise<boolean> {
    const response = this.http.post<HttpResponse<Person>>(environment.backendUrl + '/api/auth/login', {username, password});

    return response.pipe(
      tap(r => {
        if (r.ok) this.user.next(r.body)
      }),
      map(r => r.ok))
      .toPromise();
  }

  /**
   * Checks if username is not used
   * @param username
   */
  async checkUserAvailability(username: string): Promise<boolean> {
    const result = this.http.get<HttpResponse<any>>(environment.backendUrl + '/api/auth/checkUsernameAvailability', {params: {username}})
    return result.pipe(map(r => r.body)).toPromise();
  }

  /**
   * do temporary registration
   * @param username
   */
  async registerTemporary(username: string): Promise<boolean> {
    const result = this.http.post<HttpResponse<Person>>(environment.backendUrl + '/api/auth/temporaryRegister', {username});
    return result.pipe(
      tap(r => {
        if (r.ok) this.user.next(r.body);
      }),
      map(r => r.ok)).toPromise();
  }

  /**
   * do permanent registration
   * @param username
   * @param email
   * @param password
   */
  register(username: string, email: string, password: string): Promise<boolean> {
    // todo: implement
    return new Promise<boolean>(resolve => true);
  }

  /**
   * logout user
   */
  logout() {
    // todo: implement
  }

  /**
   * get info about already logged user
   */
  userInfo() {
    // todo: implement
  }
}
