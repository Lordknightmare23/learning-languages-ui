import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteTheHanziViewComponent } from './write-the-hanzi-view.component';

describe('WriteTheHanziViewComponent', () => {
  let component: WriteTheHanziViewComponent;
  let fixture: ComponentFixture<WriteTheHanziViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteTheHanziViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteTheHanziViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
