import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarManagerComponent } from './avatar-manager.component';

describe('AvatarManagerComponent', () => {
  let component: AvatarManagerComponent;
  let fixture: ComponentFixture<AvatarManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
