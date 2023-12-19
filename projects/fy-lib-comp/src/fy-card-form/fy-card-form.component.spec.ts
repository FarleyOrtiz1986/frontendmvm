import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyCardFormComponent } from './fy-card-form.component';

describe('FyCardFormComponent', () => {
  let component: FyCardFormComponent;
  let fixture: ComponentFixture<FyCardFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyCardFormComponent]
    });
    fixture = TestBed.createComponent(FyCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
