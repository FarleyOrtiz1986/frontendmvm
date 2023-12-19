import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyCardClaseComponent } from './fy-card-clase.component';

describe('FyCardClaseComponent', () => {
  let component: FyCardClaseComponent;
  let fixture: ComponentFixture<FyCardClaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyCardClaseComponent]
    });
    fixture = TestBed.createComponent(FyCardClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
