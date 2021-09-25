import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GameService} from "../../services/admin/game.service";
import {Observable} from "rxjs";
import {Cipher} from "../../model/cipher";
import {ActivatedRoute, Router} from "@angular/router";
import {CipherService} from "../../services/admin/cipher.service";

@Component({
  selector: 'app-add-cipher',
  templateUrl: './add-cipher.component.html',
  styleUrls: ['./add-cipher.component.scss', '../admin-form-theme.scss']
})
export class AddCipherComponent implements OnInit {
  cipherFormGroup: FormGroup;
  gameCiphersObs: Observable<Cipher[]>

  constructor(
    private gameService: GameService,
    private cipherService: CipherService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cipherFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      req_cipher_id: new FormControl(null),
      description: new FormControl('', [Validators.required]),
      solution: new FormControl('', [Validators.required]),
      judge: new FormControl(''),
      success_msg: new FormControl('', [Validators.required]),
      cooldown: new FormControl('', [Validators.required]),
      attempts: new FormControl('', [Validators.required]),
      score: new FormControl('', [Validators.required]),
      reference_solution: new FormControl('', [Validators.required])
    });

    this.gameCiphersObs = this.gameService.getCiphers(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
  }

  createCipher() {
    this.cipherService.addCipher(this.route.snapshot.params['id'], this.cipherFormGroup.value)
      .subscribe(cipher => {
        this.router.navigate(['/', 'admin', 'cipher', cipher.cipher_id]).then();
      }, (err) => {
        alert('nastala chyba');
        console.error(err);
      })
  }
}
