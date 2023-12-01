import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InputType } from 'lib/enums/InputType.enum';
import Gamemode from 'lib/interfaces/Gamemode.interface';
import playAudio from 'lib/modules/media/playAudio';

@Component({
  selector: 'app-write-the-hanzi-view',
  templateUrl: './write-the-hanzi-view.component.html',
  styleUrls: ['./write-the-hanzi-view.component.sass']
})
export class WriteTheHanziViewComponent {

  audio: { [key: string]: HTMLAudioElement } = {};
  selectedGamemode?: Gamemode;
  gamemodes: Gamemode[] = [
    {
      name: "Classic",
      id: "classic",
      description: "Random hanzis are shown and you have to write them down, you have an specific amount of time to write each one.  This time is reduced as you progress in the game but also the points you get for each correct answer are increased.  If you fail to write a hanzi in the given time, you lose a life.  If you lose them all, the game is over.",
      icon: "heart",
      settings: [
        {
          key: "lives",
          label: "Lives",
          type: InputType.Number,
          defaultValue: 3,
          min: 1,
          icon: "heart"
        },

        {
          key: "time",
          label: "Time per hanzi",
          type: InputType.Number,
          defaultValue: 10,
          min: 1,
          icon: "clock"
        }
      ]
    },
    {
      name: "Blitz",
      id: "blitz",
      description: "You have limited time!  Write as many hanzis as you can before the time runs out. There is not life limit, but you will lose points if you fail to write a hanzi in the given time.",
      icon: "bolt",
      settings: [
        {
          key: "time",
          label: "Total time (seconds)",
          type: InputType.Number,
          defaultValue: 60,
          min: 10,
          icon: "clock"
        }
      ]
    },
    {
      name: "Guess'em All",
      id: "guessemall",
      description: "All available hanzis are shown and you have to write them down.  There is no time limit, but if you fail to write a hanzi, you lose a life.  If you lose them all, the game is over.",
      icon: "coffee",
      settings: [
        {
          key: "lives",
          label: "Lives",
          type: InputType.Number,
          defaultValue: 3,
          min: 1,
          icon: "heart"
        }
      ]
    },
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.audio['main'] = playAudio("bgm/write-the-hanzi/main-menu")
  }
  ngOnDestroy () {
    this.audio['main'].pause();
  }

  selectGamemode(gamemode: Gamemode) {
    if (gamemode === this.selectedGamemode) {
      const options: any = {};

      for (const setting of gamemode.settings) {
        options[setting.key] = setting.value ?? setting.defaultValue;
      }
      return this.play(gamemode, options);
    }

    this.selectedGamemode = gamemode;
  }

  play (gamemode: Gamemode, options: any) {
    this.audio['main'].pause();
    this.router.navigate(['/write-the-hanzi', gamemode.id], {
      queryParams: options
    })
  }

}
