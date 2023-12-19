import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyCardInfoGenericComponent } from './fy-card-info-generic.component';

describe('FyCardInfoGenericComponent', () => {
  let component: FyCardInfoGenericComponent;
  let fixture: ComponentFixture<FyCardInfoGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyCardInfoGenericComponent]
    });
    fixture = TestBed.createComponent(FyCardInfoGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
