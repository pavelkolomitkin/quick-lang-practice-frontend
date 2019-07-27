import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSessionWindowComponent } from './practice-session-window.component';

describe('PracticeSessionWindowComponent', () => {
  let component: PracticeSessionWindowComponent;
  let fixture: ComponentFixture<PracticeSessionWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeSessionWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSessionWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
