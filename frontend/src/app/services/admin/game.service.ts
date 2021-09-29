import {HttpClient} from "@angular/common/http";
import {Game} from "../../model/game";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {Cipher} from "../../model/cipher";

@Injectable()
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  addGame(game: Game) {
    return this.http.post<number>(`${environment.backendUrl}/api/game`, game);
  }

  updateGame(game: Game) {
    return this.http.put<Game>(`${environment.backendUrl}/api/game/${game.cipher_game_id}`, game);
  }

  getCiphers(gameId: number) {
    return this.http.get<Cipher[]>(`${environment.backendUrl}/api/game/${gameId}/ciphers`);
  }
}
