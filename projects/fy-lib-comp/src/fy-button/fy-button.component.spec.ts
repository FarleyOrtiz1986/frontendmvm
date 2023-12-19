import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyButtonComponent } from './fy-button.component';

describe('FyButtonComponent', () => {
  let component: FyButtonComponent;
  let fixture: ComponentFixture<FyButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyButtonComponent]
    });
    fixture = TestBed.createComponent(FyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
