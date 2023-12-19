import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FySelectComponent } from './fy-select.component';

describe('FySelectComponent', () => {
  let component: FySelectComponent;
  let fixture: ComponentFixture<FySelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FySelectComponent]
    });
    fixture = TestBed.createComponent(FySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
