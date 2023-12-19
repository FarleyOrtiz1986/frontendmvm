import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyOffCanvasComponent } from './fy-off-canvas.component';

describe('FyOffCanvasComponent', () => {
  let component: FyOffCanvasComponent;
  let fixture: ComponentFixture<FyOffCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyOffCanvasComponent]
    });
    fixture = TestBed.createComponent(FyOffCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
