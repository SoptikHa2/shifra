import { Component, OnInit } from '@angular/core';
import {CipherService} from "../services/cipher.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs";
import {Cipher} from "../model/cipher";
import {Hint} from "../model/hint";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {AskDialogComponent} from "../dialogs/ask-dialog/ask-dialog.component";
import {skipWhile, switchMap} from "rxjs/operators";
import {HintDialogComponent} from "./hint-dialog/hint-dialog.component";

@Component({
  selector: 'app-cipher',
  templateUrl: './cipher.component.html',
  styleUrls: ['./cipher.component.scss']
})
export class CipherComponent implements OnInit {
  cipherObs: Observable<Cipher>;

  constructor(
    private cipherService: CipherService,
    private domSanitizer: DomSanitizer,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.cipherObs = this.cipherService
      .getCipher(this.route.snapshot.params['id'])
  }

  getHintCostText(hint: Hint) {
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

  hintClick(hint_id: number) {
    this.dialog.open(AskDialogComponent, {data: {text: 'Opravdu chcete nápovědu?'}}).afterClosed()
      .pipe(
        skipWhile(res => !res),
        switchMap(res => {
          if (res)
            return this.cipherService.openHint(hint_id);
          return of(null);
        }),
        switchMap(hint => {
          return this.dialog.open(HintDialogComponent,
            {data: hint, width: '100%'}).afterClosed()
        })).subscribe();
  }

  trustUrl(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
}
/*
# Lorem ipsum dolor
---
sit amet, consectetuer **adipiscing elit**. **~~Ut tempus~~** purus at lorem. Vivamus porttitor turpis ac leo. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit. Curabitur sagittis hendrerit ante. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Nullam lectus justo, vulputate eget mollis sed, tempor sed magna. Nulla non lectus sed nisl molestie malesuada. Suspendisse nisl. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Etiam bibendum elit eget erat. Praesent dapibus.

>  *et magnis dis parturient montes nascetur ridiculus mus. Nullam eget nisl.*
>  ***Nulla quis diam**. Class aptent taciti sociosqu ad*

# Aliquam ante.
---
Praesent dapibus. Proin in tellus sit amet **nibh dignissim** sagittis. Nunc auctor. Integer vulputate sem a nibh rutrum consequat. Fusce wisi. Curabitur vitae diam non enim vestibulum interdum. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Aliquam ante. Fusce consectetuer risus a nunc. Proin in tellus sit amet nibh dignissim sagittis. Duis viverra diam non justo.


# Morbi leo mi,
---
nonummy eget tristique non, rhoncus non leo. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Nullam rhoncus aliquam metus. Etiam commodo dui eget wisi. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit. Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem. Proin in tellus sit amet nibh dignissim sagittis. In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Sed convallis magna eu sem. Quisque porta. Nullam rhoncus aliquam metus. Praesent dapibus.


# Nullam at arcu
---
a est sollicitudin euismod. Mauris dolor felis, **sagittis at**, luctus sed, aliquam non, tellus. Et harum quidem rerum facilis est et expedita distinctio. Suspendisse nisl. Fusce nibh. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris elementum mauris vitae tortor. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Sed convallis magna eu sem. Nulla quis diam.


# Cum sociis natoque
---
penatibus et magnis dis parturient montes nascetur ridiculus mus. Nullam eget nisl. Nulla quis diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Etiam dictum tincidunt diam. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante. Praesent vitae arcu tempor neque lacinia pretium. Nullam sit amet magna in magna gravida vehicula. Quisque porta.

* */
