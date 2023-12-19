import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyItemCustomerCrmComponent } from './fy-item-customer-crm.component';

describe('FyItemCustomerCrmComponent', () => {
  let component: FyItemCustomerCrmComponent;
  let fixture: ComponentFixture<FyItemCustomerCrmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyItemCustomerCrmComponent]
    });
    fixture = TestBed.createComponent(FyItemCustomerCrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
