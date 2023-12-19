import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerInputComponent } from './spinner-input.component';

describe('SpinnerInputComponent', () => {
  let component: SpinnerInputComponent;
  let fixture: ComponentFixture<SpinnerInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerInputComponent]
    });
    fixture = TestBed.createComponent(SpinnerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
