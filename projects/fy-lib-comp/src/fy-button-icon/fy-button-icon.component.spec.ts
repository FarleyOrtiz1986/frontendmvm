import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyButtonIconComponent } from './fy-button-icon.component';

describe('FyButtonIconComponent', () => {
  let component: FyButtonIconComponent;
  let fixture: ComponentFixture<FyButtonIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyButtonIconComponent]
    });
    fixture = TestBed.createComponent(FyButtonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
