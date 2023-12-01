import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HanziViewComponent } from './hanzi-view.component';

describe('HanziViewComponent', () => {
  let component: HanziViewComponent;
  let fixture: ComponentFixture<HanziViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HanziViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HanziViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
