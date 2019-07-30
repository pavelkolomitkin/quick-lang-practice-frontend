import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSessionEndComponent } from './practice-session-end.component';

describe('PracticeSessionEndComponent', () => {
  let component: PracticeSessionEndComponent;
  let fixture: ComponentFixture<PracticeSessionEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeSessionEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSessionEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
