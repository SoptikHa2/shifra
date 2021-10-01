import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {GameService} from "../../services/admin/game.service";
import {Observable} from "rxjs";
import {Cipher} from "../../model/cipher";
import {ActivatedRoute, Router} from "@angular/router";
import {CipherService} from "../../services/cipher.service";
import {CipherService as AdminCipherService} from "../../services/admin/cipher.service";

@Component({
  selector: 'app-add-cipher',
  templateUrl: './add-cipher.component.html',
  styleUrls: ['./add-cipher.component.scss', '../admin-form-theme.scss']
})
export class AddCipherComponent implements OnInit {
  cipherFormGroup: FormGroup;
  gameCiphersObs: Observable<Cipher[]>
  imageName: string | undefined;
  fileName: string | undefined;
  cipher: Cipher | undefined;

  constructor(
    private gameService: GameService,
    private cipherService: CipherService,
    private adminCipherService: AdminCipherService,
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
      reference_solution: new FormControl('', [Validators.required]),
      img: new FormControl(''),
      cipher_file: new FormControl('')
    });

    this.gameCiphersObs = this.gameService.getCiphers(this.route.snapshot.params['id']);

    if (this.route.snapshot.queryParams['edit'] != null)
      this.cipherService.getCipher(this.route.snapshot.queryParams['edit'])
        .subscribe((cipher: Cipher) => {
          this.cipherFormGroup.setValue({
            name: cipher.name,
            req_cipher_id: cipher.req_cipher_id,
            description: cipher.description,
            solution: cipher.solution,
            judge: cipher.judge,
            success_msg: cipher.success_msg,
            cooldown: cipher.cooldown,
            attempts: cipher.attempts,
            score: cipher.score,
            reference_solution: cipher.reference_solution,
            img: cipher.img
          });
          this.cipher = cipher;
        }, () => alert('chyba'));
  }

  ngOnInit(): void {
  }

  updateFile(event: any, control: AbstractControl) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        control.setValue(reader.result);
      }
    }
  }

  createOrUpdateCipher() {
    if (!this.route.snapshot.queryParams['edit']) {
      this.adminCipherService.addCipher(this.route.snapshot.params['id'], this.cipherFormGroup.value)
        .subscribe(cipher => {
          this.router.navigate(['/admin', 'cipher', cipher.cipher_id]).then();
        }, err => {
          alert('nastala chyba');
          console.error(err);
        })
    } else {
      this.adminCipherService.updateCipher({...this.cipher, ...this.cipherFormGroup.value})
        .subscribe(cipher => {
          this.router.navigate(['/admin', 'cipher', cipher.cipher_id]).then();
        }, () => alert('chyba!!!'));
    }
  }

  imageChanged(event: any) {
    this.updateFile(event, this.cipherFormGroup.get('img')!);
    this.imageName = event.target.files[0].name;
  }

  fileChanged(event: any) {
    this.updateFile(event, this.cipherFormGroup.get('cipher_file')!);
    this.imageName = event.target.files[0].name;
  }
}
