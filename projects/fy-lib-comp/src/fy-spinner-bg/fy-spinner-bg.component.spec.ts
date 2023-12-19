import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FySpinnerBgComponent } from './fy-spinner-bg.component';

describe('FySpinnerBgComponent', () => {
  let component: FySpinnerBgComponent;
  let fixture: ComponentFixture<FySpinnerBgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FySpinnerBgComponent]
    });
    fixture = TestBed.createComponent(FySpinnerBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
