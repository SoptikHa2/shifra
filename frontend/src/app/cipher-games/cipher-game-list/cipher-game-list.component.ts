import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game.service";
import {Game} from "../../model/game";
import {Observable} from "rxjs";
import {Team} from "../../model/team";
import {map, skipWhile} from "rxjs/operators";

@Component({
  selector: 'app-cipher-game-list',
  templateUrl: './cipher-game-list.component.html',
  styleUrls: ['./cipher-game-list.component.scss']
})
export class CipherGameListComponent implements OnInit {
  gamesObs: Observable<[Game, Team | null][] | null>;

  constructor(
    private gameService: GameService
  ) {
    this.gamesObs = this.gameService.getGames()
      .pipe(map(games => [
          ...games!.filter(val => val[1] == null),
          ...games!.filter(val => val[1] != null)
        ]));
  }

  ngOnInit(): void {}
}
