import { Component, OnInit } from '@angular/core';
import {HintService} from "../../services/admin/hint.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CipherService} from "../../services/cipher.service";
import {Hint} from "../../model/hint";

@Component({
  selector: 'app-add-hint',
  templateUrl: './add-hint.component.html',
  styleUrls: ['./add-hint.component.scss', '../admin-form-theme.scss']
})
export class AddHintComponent implements OnInit {
  hintFormGroup: FormGroup;
  id: number | undefined;
  imageName: string | undefined;
  fileName: string | undefined;
  hint: Hint | undefined;

  constructor(
    private hintService: HintService,
    private cipherSerice: CipherService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.queryParams['edit'];
    this.hintFormGroup = new FormGroup({
      msg: new FormControl('', [Validators.required]),
      score_cost: new FormControl(null),
      time_cost: new FormControl(null),
      hint_file: new FormControl(''),
      img: new FormControl('')
    });

    if (this.id != null) {
      this.cipherSerice.openHint(this.id).subscribe(val => {
        this.hintFormGroup.setValue({
          msg: val.msg,
          score_cost: val.score_cost,
          time_cost: val.time_cost,
          hint_file: val.hint_file,
          img: val.img
        });
        this.hint = val;
      }, () => {
        alert('chyba !!!');
      });
    }
  }

  ngOnInit(): void {
  }

  submitted() {
    if (this.id == undefined) {
      console.log(this.hintFormGroup.value);
      this.hintService.addHint({...this.hintFormGroup.value, cipher_id: this.route.snapshot.params['id']})
        .subscribe((hint: Hint) => {
          this.router.navigate(['/admin', 'hint', hint.hint_id]).then()
        }, () => alert('chyba'));
    } else {
      this.hintService.updateHint({...this.hint, ...this.hintFormGroup.value})
        .subscribe(() => {
          this.router.navigate(['/admin', 'hint', this.id]).then()
        }, () => alert('chyba'));
    }
  }

  fileChanged(event: any) {
    this.updateFile(event, this.hintFormGroup.get('hint_file')!);
    this.fileName = event.target.files[0].name;
    console.log(this.hintFormGroup.value);
  }

  imageChanged(event: any) {
    this.updateFile(event, this.hintFormGroup.get(['img'])!);
    this.imageName = event.target.files[0].name;
    console.log(this.hintFormGroup.value);
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
}
