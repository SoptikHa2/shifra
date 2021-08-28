import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game.service";
import {Game} from "../../model/game";
import {Observable} from "rxjs";
import {Team} from "../../model/team";

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
    this.gamesObs = this.gameService.getGames();
  }

  ngOnInit(): void {}
}
