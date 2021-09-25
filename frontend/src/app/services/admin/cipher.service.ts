import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Cipher} from "../../model/cipher";
import {environment} from "../../../environments/environment";

@Injectable()
export class CipherService {

  constructor(
    private http: HttpClient
  ) { }

  addCipher(cipher_game_id: number, cipher: Cipher) {
    return this.http.post<Cipher>(`${environment.backendUrl}/api/cipher`, {...cipher, cipher_game_id})
  }
}
