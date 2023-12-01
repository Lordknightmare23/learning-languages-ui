import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteTheHanziPlayComponent } from './write-the-hanzi-play.component';

describe('WriteTheHanziPlayComponent', () => {
  let component: WriteTheHanziPlayComponent;
  let fixture: ComponentFixture<WriteTheHanziPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteTheHanziPlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteTheHanziPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
