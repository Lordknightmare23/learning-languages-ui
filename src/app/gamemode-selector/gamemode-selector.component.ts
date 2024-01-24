import { Component, Input } from '@angular/core';
import Gamemode from 'lib/interfaces/Gamemode.interface';

@Component({
  selector: 'gamemode-selector',
  templateUrl: './gamemode-selector.component.html',
  styleUrls: ['./gamemode-selector.component.sass']
})
export class GamemodeSelectorComponent {
  @Input() title: string = "";
  @Input() gamemodes: Gamemode[] = [];
  @Input() onGamemodePicked: Function = () => { };

  selectedGamemode?: Gamemode;

  selectGamemode(gamemode: Gamemode) {
    if (this.selectedGamemode === gamemode) this.onGamemodePicked(gamemode);
    else this.selectedGamemode = gamemode;
  }

}
