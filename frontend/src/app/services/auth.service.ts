import {Injectable} from '@angular/core';
import {Person} from "../model/person";
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
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
    //this.userInfo();
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

    const result = this.http.post<Person>(environment.backendUrl + '/api/auth/login', {username, password});
    const userObs = this.evaluatePersonResponse(result);

    return userObs.pipe(
      tap(u => this.user.next(u)),
      map(u => u.loggedIn)
    ).toPromise();
  }

  /**
   * Checks if username is not used
   * @param username
   */
  async checkUserAvailability(username: string): Promise<boolean> {
    if (this.user.value == null) {
      this.error = "to early";
      console.error("chyby");
      return new Promise(() => false);
    }

    const result = this.http.get<boolean>(environment.backendUrl + '/api/auth/checkUsernameAvailability', {params: {username}})
    return result.toPromise();
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

    const result = this.http.post<Person>(environment.backendUrl + '/api/auth/temporaryRegister', {username});
    const userObs = this.evaluatePersonResponse(result);
    return userObs.pipe(
      tap(u => this.user.next(u)),
      map(u => u.loggedIn)
    ).toPromise();
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

    const result = this.http.post<Person>(environment.backendUrl + '/api/auth/register', {username, email, password});
    const userObs = this.evaluatePersonResponse(result)
    return userObs.pipe(
        tap(u => this.user.next(u)),
        map(u => u.loggedIn)
      ).toPromise();
  }

  /**
   * logout user
   */
  async logout(): Promise<boolean> {
    if (this.user.value == null) {
      this.error = "to early";
      return new Promise(() => false);
    }

    return this.transformToSuccessObservable(
      this.http.post(environment.backendUrl + '/api/auth/logout', {})
        .pipe(
          tap(() => this.user.next({loggedIn: false, person: {nickname: ""}})),
        )
    ).toPromise();
  }

  /**
   * get info about already logged user
   */
  userInfo() {
    this.evaluatePersonResponse(this.http.get<Person>(environment.backendUrl + '/api/auth/userInfo'))
  }

  /**
   * sets up the user behavior subject.
   * @private
   * @param res
   */
  private evaluatePersonResponse(res: Observable<Person | null>): Observable<userModel> {
    return res.pipe(
      map(person => ({loggedIn: true, person: person as Person})),
      catchError(() => of({loggedIn: false, person: {nickname: ""}})));
  }

  private transformToSuccessObservable(obs: Observable<any>): Observable<boolean> {
    return obs.pipe(map(() => true), catchError(() => of(false)));
  }
}