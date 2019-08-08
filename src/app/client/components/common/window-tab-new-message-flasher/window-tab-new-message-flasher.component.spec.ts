import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowTabNewMessageFlasherComponent } from './window-tab-new-message-flasher.component';

describe('WindowTabNewMessageFlasherComponent', () => {
  let component: WindowTabNewMessageFlasherComponent;
  let fixture: ComponentFixture<WindowTabNewMessageFlasherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowTabNewMessageFlasherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowTabNewMessageFlasherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
