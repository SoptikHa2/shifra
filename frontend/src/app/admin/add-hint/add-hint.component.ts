import { Component, OnInit } from '@angular/core';
import {HintService} from "../../services/admin/hint.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {CipherService} from "../../services/cipher.service";

@Component({
  selector: 'app-add-hint',
  templateUrl: './add-hint.component.html',
  styleUrls: ['./add-hint.component.scss', '../admin-form-theme.scss']
})
export class AddHintComponent implements OnInit {
  hintFormGroup: FormGroup;
  id: number | undefined;

  constructor(
    private hintService: HintService,
    private cipherSerice: CipherService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.queryParams['edit'];
    this.hintFormGroup = new FormGroup({
      msg: new FormControl('', [Validators.required]),
      score_cost: new FormControl(null),
      time_cost: new FormControl(null)
    });

    if (this.id != null) {
      this.cipherSerice.openHint(this.id).subscribe(val => {
        this.hintFormGroup.setValue({msg: val.msg, score_cost: val.score_cost, time_cost: val.time_cost});
      }, () => {
        alert('chyba !!!');
      });
    }
  }

  ngOnInit(): void {
  }

  submitted() {
    if (this.id == undefined) {
      this.hintService.
    } else {

    }
  }
}
