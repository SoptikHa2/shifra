import {HttpClient} from "@angular/common/http";
import {Game} from "../../model/game";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable()
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  addGame(game: Game) {
    return this.http.post(`${environment.backendUrl}/api/game`, game);
  }

  getCiphers(gameId: number) {
    return this.http.get(`${environment.backendUrl}/api/game/${gameId}/ciphers`);
  }
}
