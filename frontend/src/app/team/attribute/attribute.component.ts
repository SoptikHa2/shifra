import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Team} from "../../model/team";

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss']
})
export class AttributeComponent implements OnInit {
  @Input('value')
  value?: string;

  @Input('label')
  label?: string;

  @Input('icon')
  icon?: string;

  @Input('canCopy')
  canCopy: boolean = true;

  constructor(
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log(this.value);
  }

  showCopySnack() {
    this.snackBar.open(`${this.label} zkopírován`, "OK", {duration: 1500})
  }
}
