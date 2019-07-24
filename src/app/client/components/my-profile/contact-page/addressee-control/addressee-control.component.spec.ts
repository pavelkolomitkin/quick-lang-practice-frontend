import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresseeControlComponent } from './addressee-control.component';

describe('AddresseeControlComponent', () => {
  let component: AddresseeControlComponent;
  let fixture: ComponentFixture<AddresseeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddresseeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddresseeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
