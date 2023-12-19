import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyNavbarComponent } from './fy-navbar.component';

describe('FyNavbarComponent', () => {
  let component: FyNavbarComponent;
  let fixture: ComponentFixture<FyNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyNavbarComponent]
    });
    fixture = TestBed.createComponent(FyNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
