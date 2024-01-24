import { Component, EventEmitter, Input, Output } from '@angular/core';
import Gamemode from 'lib/interfaces/Gamemode.interface';

@Component({
  selector: 'game-screen-view',
  templateUrl: './game-screen-view.component.html',
  styleUrls: ['./game-screen-view.component.sass']
})
export class GameScreenViewComponent {
  @Input() title!: string;
  @Input() gamemodes!: Gamemode[];
  @Output() onGamemodeSelected: EventEmitter<Gamemode> = new EventEmitter<Gamemode>();

  selectedGamemode!: Gamemode;

  constructor() { }

  selectGamemode(gamemode: Gamemode): void {
    if (this.selectedGamemode === gamemode) {
      this.onGamemodeSelected.emit(gamemode);
    } else {
      this.selectedGamemode = gamemode;
    }
  }
}
