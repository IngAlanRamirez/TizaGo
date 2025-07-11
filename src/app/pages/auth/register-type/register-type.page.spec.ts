import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterTypePage } from './register-type.page';

describe('RegisterTypePage', () => {
  let component: RegisterTypePage;
  let fixture: ComponentFixture<RegisterTypePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
