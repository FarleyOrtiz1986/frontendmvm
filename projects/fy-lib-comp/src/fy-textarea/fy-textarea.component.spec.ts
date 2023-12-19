import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyTextareaComponent } from './fy-textarea.component';

describe('FyTextareaComponent', () => {
  let component: FyTextareaComponent;
  let fixture: ComponentFixture<FyTextareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyTextareaComponent]
    });
    fixture = TestBed.createComponent(FyTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
