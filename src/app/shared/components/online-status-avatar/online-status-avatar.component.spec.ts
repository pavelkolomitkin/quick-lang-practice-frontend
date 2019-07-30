import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineStatusAvatarComponent } from './online-status-avatar.component';

describe('OnlineStatusAvatarComponent', () => {
  let component: OnlineStatusAvatarComponent;
  let fixture: ComponentFixture<OnlineStatusAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineStatusAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineStatusAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
