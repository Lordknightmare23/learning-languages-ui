import { Component } from '@angular/core';

@Component({
  selector: 'app-play-view',
  templateUrl: './play-view.component.html',
  styleUrls: ['./play-view.component.sass']
})
export class PlayViewComponent {
  games = [
    {
      id: 'write-the-hanzi',
      title: 'Write the Hanzi',
      description: 'Chinese characters will pop-up and you will need to write them all using your keyboard.'
    },
    {
      id: 'sentence-maker',
      title: 'Sentence Maker',
      description: 'Can you create correct random sentences with given words? Let\'s try it!.'
    }
  ];


  playGame (gameId: string) {
    
  }
}
