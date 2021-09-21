import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game.service";
import {Game} from "../../model/game";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {map, mergeMap, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss', '../../theme/flex-container-theme.scss']
})
export class DetailComponent implements OnInit {
  gameObs: Observable<Game>;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    const gameId = route.snapshot.params['id'];
    this.gameObs = gameService.getGameById(gameId)
      .pipe(mergeMap((game: Game) => {
        return this.http.get<any[]>(`${environment.backendUrl}/api/game/${game.cipher_game_id}/teams`)
          .pipe(map(team => {
            if (team.length == 0) return game;
            game.teamId = team[0].team_id;
            return game;
          }))
      }));
  }

  ngOnInit(): void {
  }



}
