import {Component, Input, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";
import {Game} from "../../model/game";
import {Observable, timer} from "rxjs";
import {Team} from "../../model/team";
import {map, mergeMap, shareReplay, tap} from "rxjs/operators";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-cipher-game-list',
  templateUrl: './cipher-game-list.component.html',
  styleUrls: ['./cipher-game-list.component.scss']
})
export class CipherGameListComponent implements OnInit {
  @Input()
  cipherRunning: boolean = false;

  gamesObs: Observable<[Game, Team | null][] | null>;

  constructor(
    private gameService: GameService,
    private domSanitizer: DomSanitizer
  ) {
    this.gamesObs = this.gameService.getGames()
      .pipe(
        map(games => [
          ...games!.filter(val => val[1] != null),
          ...games!.filter(val => val[1] == null)
        ]),
        map(games => games.map(game => {
          if (!game[0].image) return game;
          game[0].image = this.domSanitizer.bypassSecurityTrustUrl(game[0].image as string);
          return game;
        })),
        mergeMap(games => {
          return timer(0, 1000).pipe(map(() => {
            return games.map(game => {
              game[0].signup = new Date(game[0].deadline_signup) >= new Date();
              return game;
            });
          }));
        })
      );
  }

  ngOnInit(): void {}
}
