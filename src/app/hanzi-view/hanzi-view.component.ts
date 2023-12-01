import { Component } from '@angular/core';
import { MSLang } from '../services';
import Hanzi from 'lib/interfaces/Hanzi.interface';
import playAudio from 'lib/modules/media/playAudio';
import getPinyinTone from 'lib/modules/langUtils/getPinyinTone';
import { Tones } from 'lib/enums/Tones.enum';

@Component({
  selector: 'app-hanzi-view',
  templateUrl: './hanzi-view.component.html',
  styleUrls: ['./hanzi-view.component.sass']
})
export class HanziViewComponent {

  hanzi?: Hanzi;
  currentHanzi = 0;
  maxLives = 3;
  lives = 3;
  score = 0;
  streak = 0;

  allHanzi: Hanzi[] = [];
  wrongHanzi: Hanzi[] = [];
  showingActualResult = false;

  allowedToPlayMusic = false;

  ngOnInit() {
    this.startGame();
  }

  async startGame () {
    this.lives = 5;
    this.maxLives = 5;
    this.score = 0;
    this.streak = 0;
    this.currentHanzi = 0;
    this.wrongHanzi = [];

    await this.loadAllHanzi();
    await this.next();
  }

  async loadAllHanzi () {
    this.allHanzi = await MSLang.hanzi.all();
    this.allHanzi.sort(() => Math.random() - 0.5);
  }
  

  async next () {
    this.hanzi = this.allHanzi[this.currentHanzi++];
  }

  sampleSentence () {
    return this.hanzi?.sentences[Math.floor(Math.random() * this.hanzi.sentences.length)];
  }

  async onWritingHanziSubmit(_input: any) {
    if (!this.hanzi) return;
    const input = _input as HTMLInputElement;

    if (input.value === this.hanzi.character) {
      playAudio("correct");
      this.rightAnswer();

      input.value = '';
      input.focus();
    } else {
      playAudio("wrong");
      await this.loseLife();
      await this.showRightResult();

      if (this.lives === 0) return;
    }

    await this.next();

    input.value = '';
    input.focus();
  }

  async showRightResult () {
    let originalCharacter = this.hanzi!.character;
    this.hanzi = { ...this.hanzi!, character: this.hanzi!.pinyin[0] }

    await new Promise(r => setTimeout(r, 1000));
    this.hanzi = { ...this.hanzi!, character: originalCharacter };
  }

  increaseScore () {
    if (this.streak < 4) this.score++;
    else if (this.streak < 8) this.score += 2;
    else if (this.streak < 16) this.score += 3;
    else if (this.streak < 32) this.score += 4;
    else if (this.streak < 64) this.score += 5;
    else if (this.streak < 128) this.score += 6;
    else if (this.streak < 256) this.score += 7;
    else if (this.streak < 512) this.score += 8;
    else if (this.streak < 1024) this.score += 9;
    else if (this.streak < 2048) this.score += 10;
    else if (this.streak < 4096) this.score += 11;
    else if (this.streak < 8192) this.score += 12;
    else if (this.streak < 16384) this.score += 13;
    else if (this.streak < 32768) this.score += 14;
    else this.score += 15;
  }

  rightAnswer() {
    this.increaseScore();
    this.streak++;
  }

  async loseLife() {
    this.lives--;
    this.streak = 0;

    this.wrongHanzi.push(this.hanzi!);
    this.allHanzi.push(this.allHanzi.splice(this.currentHanzi, 1)[0]);

    if (this.lives === 0) {
      await this.loseGame();
    }
  }

  async loseGame() {
    await playAudio("game-over");
    console.log("You lost, please study the following characters:", this.wrongHanzi);
  }

  range(start: number, end: number): number[] {
    return Array.from({ length: end - start }, (_, index) => start + index);
  }

  allowPlayMusic () {
    if (!this.allowedToPlayMusic) {
      this.allowedToPlayMusic = true;
      playAudio("quiz");
    }
  }
}
