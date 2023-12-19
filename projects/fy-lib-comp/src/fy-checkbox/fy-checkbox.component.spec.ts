import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyCheckboxComponent } from './fy-checkbox.component';

describe('FyCheckboxComponent', () => {
  let component: FyCheckboxComponent;
  let fixture: ComponentFixture<FyCheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyCheckboxComponent]
    });
    fixture = TestBed.createComponent(FyCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
