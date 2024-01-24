import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScreenViewComponent } from './game-screen-view.component';

describe('GameScreenViewComponent', () => {
  let component: GameScreenViewComponent;
  let fixture: ComponentFixture<GameScreenViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameScreenViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameScreenViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
