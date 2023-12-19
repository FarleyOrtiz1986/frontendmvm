import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyCardComponent } from './fy-card.component';

describe('FyCardComponent', () => {
  let component: FyCardComponent;
  let fixture: ComponentFixture<FyCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyCardComponent]
    });
    fixture = TestBed.createComponent(FyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
