import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyCardDateComponent } from './fy-card-date.component';

describe('FyCardDateComponent', () => {
  let component: FyCardDateComponent;
  let fixture: ComponentFixture<FyCardDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyCardDateComponent]
    });
    fixture = TestBed.createComponent(FyCardDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
