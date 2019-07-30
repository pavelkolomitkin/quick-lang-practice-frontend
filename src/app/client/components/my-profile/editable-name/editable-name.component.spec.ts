import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableNameComponent } from './editable-name.component';

describe('EditableNameComponent', () => {
  let component: EditableNameComponent;
  let fixture: ComponentFixture<EditableNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
