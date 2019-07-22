import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresseeTypingComponent } from './addressee-typing.component';

describe('AddresseeTypingComponent', () => {
  let component: AddresseeTypingComponent;
  let fixture: ComponentFixture<AddresseeTypingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddresseeTypingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddresseeTypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
