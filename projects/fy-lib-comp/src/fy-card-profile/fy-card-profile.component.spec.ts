import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyCardProfileComponent } from './fy-card-profile.component';

describe('FyCardProfileComponent', () => {
  let component: FyCardProfileComponent;
  let fixture: ComponentFixture<FyCardProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyCardProfileComponent]
    });
    fixture = TestBed.createComponent(FyCardProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
