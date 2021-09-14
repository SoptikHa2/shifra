import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game.service";
import {Game} from "../../model/game";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss', '../../theme/flex-container-theme.scss']
})
export class DetailComponent implements OnInit {
  gameObs: Observable<Game>;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute
  ) {
    const gameId = route.snapshot.params['id'];
    this.gameObs = gameService.getGameById(gameId);
  }

  ngOnInit(): void {
  }



}
