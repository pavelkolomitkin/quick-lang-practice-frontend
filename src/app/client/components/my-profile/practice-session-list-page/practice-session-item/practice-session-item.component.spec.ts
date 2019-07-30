import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSessionItemComponent } from './practice-session-item.component';

describe('PracticeSessionItemComponent', () => {
  let component: PracticeSessionItemComponent;
  let fixture: ComponentFixture<PracticeSessionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeSessionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSessionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
