import { Component, OnInit } from '@angular/core';
import {CipherService} from "../services/cipher.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs";
import {Cipher} from "../model/cipher";
import {Hint} from "../model/hint";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {AskDialogComponent} from "../dialogs/ask-dialog/ask-dialog.component";
import {delay, map, skipWhile, switchMap, tap} from "rxjs/operators";
import {HintDialogComponent} from "./hint-dialog/hint-dialog.component";

@Component({
  selector: 'app-cipher',
  templateUrl: './cipher.component.html',
  styleUrls: ['./cipher.component.scss']
})
export class CipherComponent implements OnInit {
  cipherObs: Observable<Cipher>;
  cipher: Cipher | undefined;
  cipherId: number;
  solution: string = '';
  error?: string;

  submitting = false;

  constructor(
    private cipherService: CipherService,
    private domSanitizer: DomSanitizer,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.cipherId = this.route.snapshot.params['id'];
    this.cipherObs = this.cipherService.getCipher(this.cipherId)
      .pipe(map(this.trustUrl.bind(this)));
    this.cipherObs.subscribe(cipher => {
      this.cipher = cipher;
    });
  }

  getHintCostText(hint: Hint) {
    if (hint.is_used) return 'Otevřená';
    if (hint.score_cost && hint.time_cost)
      return `-${hint.score_cost} bodů, -${hint.time_cost} sekund`;
    if (hint.score_cost)
      return `-${hint.score_cost} bodů`;
    if (hint.time_cost)
      return `-${hint.time_cost} sekund`;
    return 'Zdarma';
  }

  ngOnInit(): void {
  }

  hintClick(hint_id: number, cipher: Cipher) {
    const stripedHint = cipher.hints.find(h => h.hint_id === hint_id);

    // If error occurs
    if (stripedHint == null)
      return;

    if (!stripedHint.score_cost && !stripedHint.time_cost) {
      this.cipherService.openHint(hint_id)
        .pipe(
          switchMap(hint => this.dialog.open(HintDialogComponent,
            {data: hint, width: '100%'}).afterClosed())
        ).subscribe();
      return;
    }

    this.dialog.open(AskDialogComponent, {data: {text: 'Opravdu chcete nápovědu?'}})
      .afterClosed()
      .pipe(
        skipWhile(res => !res),
        switchMap(res => {
          if (res)
            return this.cipherService.openHint(hint_id);
          return of(null);
        }),
        tap(hint => {
          if (hint != null)
            stripedHint.score_cost = stripedHint.time_cost = undefined;
        }),
        switchMap(hint => {
          return this.dialog.open(HintDialogComponent,
            {data: hint, width: '100%'}).afterClosed()
        })).subscribe();
  }

  trustUrl(cipher: Cipher) {
    return {...cipher, img: this.domSanitizer.bypassSecurityTrustUrl(cipher.img as string)};
  }

  makeAttempt() {
    this.submitting = true;
    this.cipherService.makeAttempt(this.cipherId, this.solution)
      .subscribe(() => {
        // todo: handle success
        this.submitting = false;
      }, err => {
        this.error = err;
        this.submitting = false;
      })
  }
}
