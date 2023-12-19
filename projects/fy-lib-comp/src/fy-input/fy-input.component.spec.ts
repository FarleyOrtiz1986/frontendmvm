import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyInputComponent } from './fy-input.component';

describe('FyInputComponent', () => {
  let component: FyInputComponent;
  let fixture: ComponentFixture<FyInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyInputComponent]
    });
    fixture = TestBed.createComponent(FyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
