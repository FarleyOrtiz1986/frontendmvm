import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyContainerDashboardCrmComponent } from './fy-container-dashboard-crm.component';

describe('FyContainerDashboardCrmComponent', () => {
  let component: FyContainerDashboardCrmComponent;
  let fixture: ComponentFixture<FyContainerDashboardCrmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyContainerDashboardCrmComponent]
    });
    fixture = TestBed.createComponent(FyContainerDashboardCrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
