import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyTableCrmComponent } from './fy-table-crm.component';

describe('FyTableCrmComponent', () => {
  let component: FyTableCrmComponent;
  let fixture: ComponentFixture<FyTableCrmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyTableCrmComponent]
    });
    fixture = TestBed.createComponent(FyTableCrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
