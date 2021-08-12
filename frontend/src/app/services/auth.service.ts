import {Injectable} from '@angular/core';
import {Person} from "../model/person";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";

type userModel = {
  loggedIn: boolean;
  person: Person
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // If loggedIn is false, value of person is not defined!
  user: BehaviorSubject<userModel | null> = new BehaviorSubject<userModel | null>(null);
  error: "to early" | undefined;

  constructor(private http: HttpClient) {
    this.userInfo();
  }

  /**
   * Tries to login using username and password
   * In case of success fills user attribute with user data
   * @param username
   * @param password
   */
  async login(username: string, password: string): Promise<boolean> {
    if (this.user.value == null) {
      this.error = "to early";
      return new Promise(() => false);
    }

    const response = this.http.post<HttpResponse<Person>>(environment.backendUrl + '/api/auth/login', {username, password});

    return response.pipe(
      tap(this.evaluatePersonResponse),
      map(r => r.ok))
      .toPromise();
  }

  /**
   * Checks if username is not used
   * @param username
   */
  async checkUserAvailability(username: string): Promise<boolean> {
    if (this.user.value == null) {
      this.error = "to early";
      return new Promise(() => false);
    }

    const result = this.http.get<HttpResponse<any>>(environment.backendUrl + '/api/auth/checkUsernameAvailability', {params: {username}})
    return result.pipe(map(r => r.body)).toPromise();
  }

  /**
   * do temporary registration
   * @param username
   */
  async registerTemporary(username: string): Promise<boolean> {
    if (this.user.value == null) {
      this.error = "to early";
      return new Promise(() => false);
    }

    const result = this.http.post<HttpResponse<Person>>(environment.backendUrl + '/api/auth/temporaryRegister', {username});
    return result.pipe(
      tap(this.evaluatePersonResponse),
      map(r => r.ok)).toPromise();
  }

  /**
   * do permanent registration
   * @param username
   * @param email
   * @param password
   */
  async register(username: string, email: string, password: string): Promise<boolean> {
    if (this.user.value == null) {
      this.error = "to early";
      return new Promise(() => false);
    }

    const result = this.http.post<HttpResponse<Person>>(environment.backendUrl + '/api/auth/register', {username, email, password});
    return result.pipe(
      tap(this.evaluatePersonResponse),
      map(r => r.ok)).toPromise();
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

  /**
   * sets up the user behavior subject.
   * @param response
   * @private
   */
  private evaluatePersonResponse(response: HttpResponse<Person>) {
      this.user.next({loggedIn: response.ok, person: response.body as Person});
  }
}
