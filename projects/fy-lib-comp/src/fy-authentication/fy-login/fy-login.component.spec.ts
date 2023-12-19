import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyLoginComponent } from './fy-login.component';

describe('FyLoginComponent', () => {
  let component: FyLoginComponent;
  let fixture: ComponentFixture<FyLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyLoginComponent]
    });
    fixture = TestBed.createComponent(FyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
