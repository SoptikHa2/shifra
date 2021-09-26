import { Component, OnInit } from '@angular/core';
import {CipherService} from "../../services/cipher.service";
import {Hint} from "../../model/hint";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {HintService} from "../../services/admin/hint.service";

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss']
})
export class HintComponent implements OnInit {
  hintObs: Observable<Hint>;

  constructor(
    private cipherService: CipherService,
    private hintService: HintService,
    private route: ActivatedRoute
  ) {
    this.hintObs = cipherService.openHint(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
  }

  deleteHint() {
    this.hintService.deleteHint(this.route.snapshot.params['id']).subscribe(() => {}, () => {
      alert('nezdařilo se!');
    });
  }
}
