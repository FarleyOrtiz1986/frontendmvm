import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyLabelFormComponent } from './fy-label-form.component';

describe('FyLabelFormComponent', () => {
  let component: FyLabelFormComponent;
  let fixture: ComponentFixture<FyLabelFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyLabelFormComponent]
    });
    fixture = TestBed.createComponent(FyLabelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
