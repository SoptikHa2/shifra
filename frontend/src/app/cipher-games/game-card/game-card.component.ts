import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../model/game";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  @Input()
  game?: Game;

  constructor() { }

  ngOnInit(): void {
  }
}
