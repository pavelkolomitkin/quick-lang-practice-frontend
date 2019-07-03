import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlItemComponent } from './control-item.component';

describe('ControlItemComponent', () => {
  let component: ControlItemComponent;
  let fixture: ComponentFixture<ControlItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
