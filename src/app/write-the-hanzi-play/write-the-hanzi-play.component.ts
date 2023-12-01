import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Hanzi from 'lib/interfaces/Hanzi.interface';
import { MSLang } from '../services';
import { UtilsService } from '../utils.service';
import playAudio from 'lib/modules/media/playAudio';
import { GameResult } from 'lib/enums/GameResult.enum';
import { GameStage } from 'lib/enums/GameStage.enum';
import PlayAudioOptions from 'lib/interfaces/PlayAudioOptions.interface';
import Leaderboard from 'lib/interfaces/Leaderboard.interface';
import getPinyinTone from 'lib/modules/langUtils/getPinyinTone';
import { Tones } from 'lib/enums/Tones.enum';

interface Turn {
  turn: number,
  hanzi: Hanzi,
  result: GameResult,
  startTime: number,
  endTime: number,
};

@Component({
  selector: 'app-write-the-hanzi-play',
  templateUrl: './write-the-hanzi-play.component.html',
  styleUrls: ['./write-the-hanzi-play.component.sass']
})
export class WriteTheHanziPlayComponent {

  hanzis: Hanzi[] = [];
  turns: Turn[] = [];
  leaderboard: Leaderboard[] = [];

  gamemode: string = "";
  totalLives: number = 0;

  turn?: Turn;

  lives: number = 0;
  time: number = 0;
  currentTime: number = 0;
  streak: number = 0;
  multiplier: number = 1;
  score: number = 0;

  playing: boolean = false;
  gameOver: boolean = false;

  currentHanziIdx: number = 0;
  currentHanzi?: Hanzi;

  audio: { [key: string]: HTMLAudioElement } = {};
  color?: string;

  stage: GameStage = GameStage.Intro;
  gameOverScreenStage = 0;


  private __timer: any;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    public utils: UtilsService
  ) {}

  ngOnDestroy () {
    this.stopAllAudio();
  }

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    const gamemode = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
    
    this.lives = parseInt(queryParams['lives']);
    this.totalLives = this.lives;
    this.time = parseInt(queryParams['time']);
    this.currentTime = this.time;
    this.gamemode = gamemode;

    this.start();
  }

  async start () {
    this.stopAllAudio();
    this.stopAudio('intro');
    this.playing = false;

    await this.loadHanzis();
    await this.startIntro();

    this.currentHanziIdx = 0;
    this.playing = true;
    this.gameOver = false;
    this.streak = 0;
    this.score = 0;
    this.lives = this.totalLives;
    this.multiplier = 1;
    this.turns = [];

    await this.startTimer();
    await this.startAudio();

    this.startTurn();
  }

  async startIntro () {
    this.stage = GameStage.Intro;
    this.playAudio('intro', 'se/countdown', { ext: "wav" });
    this.audio['intro'].currentTime = 0.1;
    this.currentHanzi = { character: "3", sentences: [], pinyin: [] };
    await this.utils.sleep(1000);
    this.currentHanzi = { character: "2", sentences: [], pinyin: [] };
    await this.utils.sleep(1000);
    this.currentHanzi = { character: "1", sentences: [], pinyin: [] };
    await this.utils.sleep(1000);
    setTimeout(() => this.stopAudio('intro'), 1000);
    this.stage = GameStage.Playing;
  }

  async startAudio () {
    this.startMainAudio();
  }

  stopAllAudio () {
    for (const key in this.audio) {
      this.stopAudio(key);
    }
  }

  async startMainAudio () {
    if (this.gamemode === "classic") {
      this.playAudio('main', 'bgm/write-the-hanzi/classic/easy', { loop: true });
    } else if (this.gamemode === "blitz") {
      this.playAudio('main', 'bgm/write-the-hanzi/blitz/bgm', { loop: true });
    } else if (this.gamemode === "guessemall") {
      this.playAudio('main', 'bgm/write-the-hanzi/guessemall/bgm', { loop: true });
    }
  }

  playAudio (key: string, path: string, options: PlayAudioOptions = {}) {
    
    if (this.audio[key]) {
      this.audio[key].pause();
      delete this.audio[key];
    }

    this.audio[key] = playAudio(path, options);
  }

  stopAudio (key: string) {
    if (this.audio[key]) {
      this.audio[key].pause();
      this.audio[key].currentTime = 0;
    }
  }

  async startTimer () {
    if (this.gamemode === "guessemall") return;
    let nextChime = this.time / 2;
    this.__timer = setInterval(() => {
      this.currentTime--;

      if (this.currentTime <= 0) {
        this.stopTimer();

        if (this.gamemode === "classic"){
          this.turnLose();
          this.startTimer();
        } else if (this.gamemode === "blitz") {
          this.end(GameResult.Lose);
        }
      }

      if (this.currentTime <= nextChime) {
        playAudio('se/hurry-up');
        nextChime /= 2;
      }
    }, 1000);
  }

  async stopTimer () {
    clearInterval(this.__timer);
  }

  nextHanzi () {
    this.currentHanzi = this.hanzis[this.currentHanziIdx++];

    if (!this.currentHanzi) {
      this.currentHanziIdx = 0;
      this.currentHanzi = this.hanzis[this.currentHanziIdx++];
    }
  }



  updateHanziColor () {
    const tone = getPinyinTone(this.currentHanzi!.pinyin[0]);

    if (tone === Tones.Falling) this.color = "#34e8eb";
    else if (tone === Tones.FallingRising) this.color = "#a434eb";
    else if (tone === Tones.Rising) this.color = "#ebc634";
    else if (tone === Tones.Level) this.color = "#34eb52";
    else this.color = "black";
    
  }

  async loadHanzis () {
    this.hanzis = await MSLang.hanzi.byLowestScore();

    return this.hanzis;
  }

  async setColor (color: string, timeout?: number) {
    this.color = color;
    if (timeout) {
      await this.utils.sleep(timeout);
      delete this.color;
    }
  }

  //* Core Mechanics
  async onCharacterSubmit (character: string, element: HTMLInputElement) {
    if (!this.playing || character.trim() === "") return;

    element.value = "";
    if (character.includes(this.currentHanzi?.character!)) {
      await MSLang.hanzi.feedback({ hanzi: this.currentHanzi?.character, feedback: "positive" });
      await this.turnWin();
    } else {
      await MSLang.hanzi.feedback({ hanzi: this.currentHanzi?.character, feedback: "negative" });
      await this.turnLose();
    }
  }

  async startTurn () {
    
    switch (this.gamemode) {
      case "classic":
        this.currentTime = Math.ceil(this.time * Math.pow(0.9, Math.log2((1 + this.turns.length)/1.5)));
    }

    this.nextHanzi();
    this.updateHanziColor();
    this.turn = {
      turn: this.turns.length + 1,
      hanzi: this.currentHanzi!,
      result: GameResult.Lose,
      startTime: Date.now(),
      endTime: 0
    };
  }

  endTurn (result: GameResult) {
    this.turn!.endTime = Date.now();
    this.turn!.result = result;

    this.turns.push(this.turn!);
  }

  resetStreak () {
    this.streak = 0;
    if (this.multiplier >= 4) {
      this.startMainAudio();
    }
    this.multiplier = 1;
  }

  increaseStreak () {
    this.streak++;
    
    if (this.gamemode === "classic" && this.multiplier === 3 && Math.floor(Math.log2(this.streak)) + 1 === 4) {
      this.playAudio('main', 'bgm/write-the-hanzi/classic/high-streak', { loop: true });
    }

    this.multiplier = Math.floor(Math.log2(this.streak)) + 1;
  }

  increaseScore () {
    this.score += (1 + Math.floor(Math.random() * 4)) * this.multiplier;
  }

  async turnWin () {
    this.stopTimer();
    this.increaseScore();
    this.increaseStreak();

    this.playAudio('win', 'se/correct');
    this.currentHanzi = <any>{
      ...this.currentHanzi,
      character: this.currentHanzi?.pinyin[0] ?? ""
    };
    await this.setColor('#2dbd48', 500);
    this.startTimer();
    this.endTurn(GameResult.Win);
    this.startTurn();
  }

  async turnLose () {
    if(this.lives-- === 0) {
      this.playing = false;
    }

    this.resetStreak();

    this.playAudio('lose', 'se/wrong');
    this.currentHanzi = <any>{
      ...this.currentHanzi,
      character: this.currentHanzi?.pinyin[0] ?? ""
    };

    await this.setColor('#d62d2d', 500);
    this.endTurn(GameResult.Lose);

    if (this.lives === 0) {
      this.end(GameResult.Lose);
      return;
    }
    
    this.startTurn();
  }

  async end (result: GameResult) {
    this.playing = false;
    this.gameOver = true;
    this.stopTimer();

    if (result === GameResult.Lose) {
      this.stopAudio("main");
      await this.utils.sleep(1000);
      playAudio("se/game-over");
      await this.utils.sleep(2000);
      this.showGameoverScreen()
    }
    const username = "Camilo";

    if (this.score !== 0) {
      await MSLang.leaderboards.add({
        game: "write-the-hanzi",
        mode: `${this.gamemode}:${this.totalLives}:${this.time}`,
        score: this.score,
        username,
        extraData: {}
      });
    }
  }

  async showGameoverScreen () {
    this.stage = GameStage.GameOver;
    this.playAudio("main", "bgm/write-the-hanzi/review", {
      loop: {
        start: 16.685,
        end: 32.35
      }
    });
  }

  async startReview () {
    this.stage = GameStage.Review;
  }

  async showLeaderboards () {
    this.leaderboard = await MSLang.leaderboards.get({
      game: "write-the-hanzi",
      mode: `${this.gamemode}:${this.totalLives}:${this.time}`
    });

    this.stage = GameStage.Leaderboards;
  }

  async exit () {
    this.stopAllAudio();
    this.stopTimer();
    this.playing = false;
    this.gameOver = false;
    this.stage = GameStage.Intro;
    this.gameOverScreenStage = 0;

    this.router.navigate(['/write-the-hanzi']);
  }

}
