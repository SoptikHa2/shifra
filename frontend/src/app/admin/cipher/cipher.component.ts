import { Component, OnInit } from '@angular/core';
import {CipherService} from "../../services/cipher.service";
import {Observable, of} from "rxjs";
import {Cipher} from "../../model/cipher";
import {ActivatedRoute} from "@angular/router";
import {map, mergeAll, mergeMap, reduce} from "rxjs/operators";
import {flatMap} from "rxjs/internal/operators";
import {Hint} from "../../model/hint";

@Component({
  selector: 'app-cipher',
  templateUrl: './cipher.component.html',
  styleUrls: ['./cipher.component.scss']
})
export class CipherComponent implements OnInit {

  cipherObs: Observable<Cipher>;

  constructor(
    private cipherService: CipherService,
    private route: ActivatedRoute
  ) {
    this.cipherObs = this.cipherService.getCipher(this.route.snapshot.params['id'])
      .pipe(mergeMap(cipher => {
        const hints = cipher.hints.map(hint => this.cipherService.openHint(hint.hint_id));
        return of(hints)
          .pipe(
            mergeAll(),
            flatMap(hints => hints),
            reduce((acc: Hint[], next) => [...acc, next], []),
            map(hints => ({...cipher, hints: hints}))
          )
      }));
  }

  ngOnInit(): void {
  }

  hintClicked() {

  }
}
