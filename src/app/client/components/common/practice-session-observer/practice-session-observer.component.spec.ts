import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSessionObserverComponent } from './practice-session-observer.component';

describe('PracticeSessionObserverComponent', () => {
  let component: PracticeSessionObserverComponent;
  let fixture: ComponentFixture<PracticeSessionObserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeSessionObserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSessionObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
