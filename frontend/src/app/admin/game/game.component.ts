import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/game.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Game} from "../../model/game";
import {map, mergeMap} from "rxjs/operators";
import {CipherService} from "../../services/cipher.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameObs: Observable<Game>

  constructor(
    private gameService: GameService,
    private cipherService: CipherService,
    private route: ActivatedRoute
  ) {
    this.gameObs = this.gameService.getGameById(this.route.snapshot.params['id'])
      .pipe(mergeMap(game =>
        this.cipherService.getVisibleCiphers(game.cipher_game_id)
          .pipe(map(ciphers => ({...game, ciphers})))
      ))
  }

  ngOnInit(): void {
  }

}
