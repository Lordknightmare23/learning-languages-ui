import { Component, Input } from '@angular/core';
import Gamemode from 'lib/interfaces/Gamemode.interface';

@Component({
  selector: 'game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.sass']
})
export class GameViewComponent {
  @Input() title: string = "";
  @Input() gamemodes: Gamemode[] = [];

}
