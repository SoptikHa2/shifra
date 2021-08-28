import { Component, OnInit } from '@angular/core';
import {CipherService} from "../services/cipher.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Cipher} from "../model/cipher";

@Component({
  selector: 'app-cipher',
  templateUrl: './cipher.component.html',
  styleUrls: ['./cipher.component.scss']
})
export class CipherComponent implements OnInit {
  cipherObs: Observable<Cipher>;
  text: string;

  constructor(
    private cipherService: CipherService,
    private route: ActivatedRoute
  ) {
    this.cipherObs = this.cipherService
      .getCipher(this.route.snapshot.params['id'])
    this.text = `Lorem **ipsum dolor** sit amet, consectetuer adipiscing elit.
    Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit.
    In enim a arcu imperdiet malesuada. Nunc dapibus tortor vel mi dapibus sollicitudin.
    Praesent vitae arcu tempor neque lacinia pretium.`;
  }

  ngOnInit(): void {
  }

}
