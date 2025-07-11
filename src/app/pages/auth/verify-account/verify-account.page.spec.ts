import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerifyAccountComponent } from './verify-account.component';

describe('VerifyAccountComponent', () => {
  let component: VerifyAccountComponent;
  let fixture: ComponentFixture<VerifyAccountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VerifyAccountComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
