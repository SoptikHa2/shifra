import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {GameService as AdminGameService} from "../../services/admin/game.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Game} from "../../model/game";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss', '../admin-form-theme.scss']
})
export class AddGameComponent implements OnInit {
  gameFormControl: FormGroup;
  game: Game | undefined;
  imageName: string | undefined;

  constructor(
    private adminGameService: AdminGameService,
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute
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
      password: new FormControl(''),
      autoapprove: new FormControl(false, [Validators.required]),
      image: new FormControl('')
    });

    if (this.route.snapshot.queryParams['edit'] != null)
      this.gameService.getGameById(this.route.snapshot.queryParams['edit']).subscribe(game => {
        this.gameFormControl.setValue({
          name: game.name,
          description: game.description,
          visible_from: game.visible_from,
          starts_at: game.starts_at,
          deadline_signup: game.deadline_signup,
          deadline_event: game.deadline_event,
          capacity: game.capacity,
          teammax: game.teammax,
          password: game.password,
          autoapprove: game.autoapprove,
          image: game.image ? game.image : ''
        });
        this.game = game;
      }, () => alert('chyba'))
  }

  ngOnInit(): void {
  }

  createOrUpdateGame() {
    if (!this.route.snapshot.queryParams['edit']) {
      this.adminGameService.addGame({
        ...this.gameFormControl.value,
        cipher_id_to_start_timer: null
      }).subscribe((gameId: number) => {
        this.router.navigate(['/admin', 'game', gameId]).then();
      }, err => {
        alert('stala se neočekávaná chyba')
        console.log(err);
      });
    } else {
      this.adminGameService.updateGame({...this.game, ...this.gameFormControl.value})
        .subscribe(game => {
          this.router.navigate(['/admin', 'game', game.cipher_game_id]).then();
        }, () => alert('chyba!!!'));
    }
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

  imageChanged(event: any) {
    this.updateFile(event, this.gameFormControl.get('image')!)
    this.imageName = event.target.files[0].name;
  }
}
