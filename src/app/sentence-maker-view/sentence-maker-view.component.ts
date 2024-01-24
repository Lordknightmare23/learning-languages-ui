import { Component } from '@angular/core';
import { InputType } from 'lib/enums/InputType.enum';
import Gamemode from 'lib/interfaces/Gamemode.interface';

@Component({
  selector: 'app-sentence-maker-view',
  templateUrl: './sentence-maker-view.component.html',
  styleUrls: ['./sentence-maker-view.component.sass']
})
export class SentenceMakerViewComponent {

  gamemodes: Gamemode[] = [
    {
      id: 'write-a-sentence',
      name: 'Write a sentence',
      description: 'Write a sentence using the given words',
      icon: 'pencil',
      settings: [
        {
          type: InputType.Number,
          label: 'Number of words',
          value: 1,
          min: 1,
          key: 'numberOfWords',
          icon: 'hashtag',
          defaultValue: 1
        }
      ]
    },
    {
      id: 'understand-a-sentence',
      name: 'Reading',
      description: 'Understand a sentence using the given words, and write an accurate translation',
      icon: 'eye',
      settings: [
        {
          type: InputType.Number,
          label: 'Number of words',
          value: 1,
          min: 1,
          key: 'numberOfWords',
          icon: 'hashtag',
          defaultValue: 1
        }
      ]
    }
  ];

  selectGamemode(gamemode: Gamemode): void {

  }
}
