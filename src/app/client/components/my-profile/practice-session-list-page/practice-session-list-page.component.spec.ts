import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSessionListPageComponent } from './practice-session-list-page.component';

describe('PracticeSessionListPageComponent', () => {
  let component: PracticeSessionListPageComponent;
  let fixture: ComponentFixture<PracticeSessionListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeSessionListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSessionListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
