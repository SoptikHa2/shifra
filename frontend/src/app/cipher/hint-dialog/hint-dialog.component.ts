import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Hint} from "../../model/hint";

@Component({
  selector: 'app-hint-dialog',
  templateUrl: './hint-dialog.component.html',
  styleUrls: ['./hint-dialog.component.scss']
})
export class HintDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Hint
  ) { }

  ngOnInit(): void {
  }

}
