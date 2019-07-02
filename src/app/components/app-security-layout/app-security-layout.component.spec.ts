import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSecurityLayoutComponent } from './app-security-layout.component';

describe('AppSecurityLayoutComponent', () => {
  let component: AppSecurityLayoutComponent;
  let fixture: ComponentFixture<AppSecurityLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSecurityLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSecurityLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
