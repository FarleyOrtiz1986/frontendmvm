import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyTooltipsComponent } from './fy-tooltips.component';

describe('FyTooltipsComponent', () => {
  let component: FyTooltipsComponent;
  let fixture: ComponentFixture<FyTooltipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyTooltipsComponent]
    });
    fixture = TestBed.createComponent(FyTooltipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
