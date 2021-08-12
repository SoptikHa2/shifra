import {Injectable} from '@angular/core';
import {Person} from "../model/person";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";

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
    // todo: implement
    return new Promise(resolve => true);
  }

  /**
   * Checks if username is not used
   * @param username
   */
  async checkUserAvailability(username: string): Promise<boolean> {
    // todo: implement
    return new Promise(resolve => true);
  }

  /**
   * do temporary registration
   * @param username
   */
  async registerTemporary(username: string): Promise<boolean> {
    // todo: implement
    return new Promise(resolve => true);
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
