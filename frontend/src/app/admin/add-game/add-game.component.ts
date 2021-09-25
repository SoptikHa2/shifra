import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GameService} from "../../services/admin/game.service";

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss', '../admin-form-theme.scss']
})
export class AddGameComponent implements OnInit {

  gameFormControl: FormGroup;

  constructor(
    private gameService: GameService
  ) {
    this.gameFormControl = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      visible_from: new FormControl('', [Validators.required]),
      starts_at: new FormControl('', [Validators.required]),
      deadline_signup: new FormControl('', [Validators.required]),
      deadline_event: new FormControl('', [Validators.required]),
      capacity: new FormControl('', [Validators.required]),
      teammax: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      autoapprove: new FormControl(false, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  createGame() {
    this.gameService.addGame({
      ...this.gameFormControl.value,
      cipher_id_to_start_timer: null,
      image: ''
    }).subscribe(() => {
    }, err => {
      alert('stala se neočekávaná chyba')
      console.log(err);
    });
  }
}
