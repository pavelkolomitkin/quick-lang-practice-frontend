import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillFormComponent } from './add-skill-form.component';

describe('AddSkillFormComponent', () => {
  let component: AddSkillFormComponent;
  let fixture: ComponentFixture<AddSkillFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSkillFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
