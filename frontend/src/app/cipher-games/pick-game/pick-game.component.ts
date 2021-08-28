import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Game} from "../../model/game";
import {Team} from "../../model/team";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-pick-game',
  templateUrl: './pick-game.component.html',
  styleUrls: ['./pick-game.component.scss']
})
export class PickGameComponent implements OnInit {
  gamesObs: Observable<[Game, Team | null][] | null>;

  constructor(
    private gameService: GameService
  ) {
    this.gamesObs = this.gameService.getGames();
  }

  ngOnInit(): void {}
}
