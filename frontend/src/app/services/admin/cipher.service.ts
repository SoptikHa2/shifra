import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CipherService {

  constructor(
    private http: HttpClient
  ) { }
}
