import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeLanguageStatusComponent } from './practice-language-status.component';

describe('PracticeLanguageStatusComponent', () => {
  let component: PracticeLanguageStatusComponent;
  let fixture: ComponentFixture<PracticeLanguageStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeLanguageStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeLanguageStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
