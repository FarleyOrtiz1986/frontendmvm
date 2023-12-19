import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyModalComponent } from './fy-modal.component';

describe('FyModalComponent', () => {
  let component: FyModalComponent;
  let fixture: ComponentFixture<FyModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyModalComponent]
    });
    fixture = TestBed.createComponent(FyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
