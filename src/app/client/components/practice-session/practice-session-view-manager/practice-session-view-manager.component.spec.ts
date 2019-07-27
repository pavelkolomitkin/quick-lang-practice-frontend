import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSessionViewManagerComponent } from './practice-session-view-manager.component';

describe('PracticeSessionViewManagerComponent', () => {
  let component: PracticeSessionViewManagerComponent;
  let fixture: ComponentFixture<PracticeSessionViewManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeSessionViewManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSessionViewManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
