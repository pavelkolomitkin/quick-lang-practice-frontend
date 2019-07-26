import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStateObserverComponent } from './profile-state-observer.component';

describe('ProfileStateObserverComponent', () => {
  let component: ProfileStateObserverComponent;
  let fixture: ComponentFixture<ProfileStateObserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileStateObserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStateObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
