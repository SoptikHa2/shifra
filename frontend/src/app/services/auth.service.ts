import {Injectable} from '@angular/core';
import {Person} from "../model/person";
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

export type userModel = {
  loggedIn: boolean;
  person: Person,
}
export type errorMessage = "Zkuste to za chvíly prosím znovu" |
  "Nesprávné heslo nebo uživatelské jméno" |
  "Chyba na straně serveru" |
  "Stala se neočekávaná chyba" |
  "Již jste přihlášený" |
  "Uživatelské jméno již někdo používá";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlBeforePromting: string = "/";

  // If loggedIn is false, value of person is not defined!
  user: BehaviorSubject<userModel | null> = new BehaviorSubject<userModel | null>(null);
  private error?: errorMessage;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
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
      this.error = "Zkuste to za chvíly prosím znovu";
      return new Promise(() => false);
    }

    const result = this.http.post<Person>(environment.backendUrl + '/api/auth/login', {username, password})
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.error = "Nesprávné heslo nebo uživatelské jméno"
        } else if (err.status >= 401 && err.status < 500) {
          this.error = "Stala se neočekávaná chyba";
        } else {
          this.error = "Chyba na straně serveru"
        }
        return throwError(err);
      }));
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
      this.error = "Zkuste to za chvíly prosím znovu";
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
      this.error = "Zkuste to za chvíly prosím znovu";
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
      this.error = "Zkuste to za chvíly prosím znovu";
      return new Promise(() => false);
    }

    const result = this.http.post<Person>(environment.backendUrl + '/api/auth/register', {username, email, password})
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status == 400) {
            this.error = "Již jste přihlášený"
          } else if (err.status == 409) {
            this.error = "Uživatelské jméno již někdo používá";
          } else if (err.status >= 400 && err.status < 500) {
            this.error = "Stala se neočekávaná chyba"
          } else {
            this.error = "Chyba na straně serveru";
          }
          return throwError(err);
        })
      );
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
      this.error = "Zkuste to za chvíly prosím znovu";
      return new Promise(() => false);
    }

    return this.transformToSuccessObservable(
      this.http.post(environment.backendUrl + '/api/auth/logout', {})
        .pipe(
          tap(() => {
            this.user.next({loggedIn: false, person: {nickname: ""}});
            this.promptToLogin();
          }),
        )
    ).toPromise();
  }

  promptToLogin(sw: boolean = true) {
    this.urlBeforePromting = this.router.url;
    this.router.navigate(['auth', (sw ? 'login' : 'register')]).then();
  }

  setUrlBeforePrompting(url: string) {
    this.urlBeforePromting = url;
  }

  returnFromPromotedLogin() {
    this.router.navigate([this.urlBeforePromting]).then(() => {
      this.urlBeforePromting = "/";
    });
  }

  /**
   * get info about already logged user
   */
  userInfo() {
    this.evaluatePersonResponse(this.http.get<Person>(environment.backendUrl + '/api/auth/userInfo'))
      .subscribe(user => this.user.next(user));
  }

  getError() {
    return this.error;
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

  /**
   * Transforms Observable<any> to Observable<boolean>
   * where boolean is success
   * @param obs
   * @private
   */
  private transformToSuccessObservable(obs: Observable<any>): Observable<boolean> {
    return obs.pipe(map(() => true), catchError(() => of(false)));
  }
}
