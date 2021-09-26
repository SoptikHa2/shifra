import { Component, OnInit } from '@angular/core';
import {HintService} from "../../services/admin/hint.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-hint',
  templateUrl: './add-hint.component.html',
  styleUrls: ['./add-hint.component.scss']
})
export class AddHintComponent implements OnInit {
  hintFormGroup: FormGroup;

  constructor(
    private hintService: HintService
  ) {
    this.hintFormGroup = new FormGroup({

    });
  }

  ngOnInit(): void {
  }

}
