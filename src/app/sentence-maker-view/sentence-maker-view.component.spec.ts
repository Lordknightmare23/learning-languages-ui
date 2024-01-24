import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceMakerViewComponent } from './sentence-maker-view.component';

describe('SentenceMakerViewComponent', () => {
  let component: SentenceMakerViewComponent;
  let fixture: ComponentFixture<SentenceMakerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentenceMakerViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentenceMakerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
