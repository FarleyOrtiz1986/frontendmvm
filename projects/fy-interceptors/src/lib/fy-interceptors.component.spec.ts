import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyInterceptorsComponent } from './fy-interceptors.component';

describe('FyInterceptorsComponent', () => {
  let component: FyInterceptorsComponent;
  let fixture: ComponentFixture<FyInterceptorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FyInterceptorsComponent]
    });
    fixture = TestBed.createComponent(FyInterceptorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
