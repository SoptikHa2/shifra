import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Cipher} from "../../model/cipher";
import {CipherService} from "../../services/cipher.service";
import {ActivatedRoute} from "@angular/router";
import {GameService} from "../../services/game.service";
import {Game} from "../../model/game";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-cipher-list',
  templateUrl: './cipher-list.component.html',
  styleUrls: ['../../theme/menu-theme.scss', './cipher-list.component.scss']
})
export class CipherListComponent implements OnInit {
  ciphersObs: Observable<Cipher[] | null>;
  gameObs: Observable<Game | null>;

  constructor(
    private cipherService: CipherService,
    private gameService: GameService,
    private route: ActivatedRoute
  ) {
    this.ciphersObs = this.cipherService.getVisibleCiphers(this.route.snapshot.params['id'])
      .pipe(
        filter(ciphers => ciphers !== null),
        map(ciphers => {
        for (let i = 0; i < ciphers?.length!; ++i) {
          ciphers![i].solved = (i % 2 === 0);
        }
        return ciphers;
      }));
    this.gameObs = this.gameService.getGameById(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
  }

}
