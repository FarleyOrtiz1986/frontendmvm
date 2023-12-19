import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyErrorFormComponent } from './fy-error-form.component';

describe('FyErrorFormComponent', () => {
  let component: FyErrorFormComponent;
  let fixture: ComponentFixture<FyErrorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyErrorFormComponent]
    });
    fixture = TestBed.createComponent(FyErrorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
