import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyContainerDashboardComponent } from './fy-container-dashboard.component';

describe('FyContainerDashboardComponent', () => {
  let component: FyContainerDashboardComponent;
  let fixture: ComponentFixture<FyContainerDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyContainerDashboardComponent]
    });
    fixture = TestBed.createComponent(FyContainerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
