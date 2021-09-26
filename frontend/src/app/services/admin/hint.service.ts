import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Hint} from "../../model/hint";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HintService {

  constructor(
    private http: HttpClient
  ) { }

  updateHint(updatedHint: Hint) {
    return this.http.put(`${environment.backendUrl}/api/hint/${updatedHint.hint_id}`, updatedHint);
  }

  deleteHint(hintId: number) {
    return this.http.delete(`${environment.backendUrl}/api/hint/${hintId}`);
  }

  addHint(newHint: Hint) {
    return this.http.post(`${environment.backendUrl}/api/hint`, newHint);
  }
}
