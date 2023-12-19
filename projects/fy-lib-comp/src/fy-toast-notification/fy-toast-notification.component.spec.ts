import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyToastNotificationComponent } from './fy-toast-notification.component';

describe('FyToastNotificationComponent', () => {
  let component: FyToastNotificationComponent;
  let fixture: ComponentFixture<FyToastNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyToastNotificationComponent]
    });
    fixture = TestBed.createComponent(FyToastNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
