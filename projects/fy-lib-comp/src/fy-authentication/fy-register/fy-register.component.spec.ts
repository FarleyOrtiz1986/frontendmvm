import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyRegisterComponent } from './fy-register.component';

describe('FyRegisterComponent', () => {
  let component: FyRegisterComponent;
  let fixture: ComponentFixture<FyRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyRegisterComponent]
    });
    fixture = TestBed.createComponent(FyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
