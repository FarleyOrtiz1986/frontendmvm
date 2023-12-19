import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyGuardsComponent } from './fy-guards.component';

describe('FyGuardsComponent', () => {
  let component: FyGuardsComponent;
  let fixture: ComponentFixture<FyGuardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FyGuardsComponent]
    });
    fixture = TestBed.createComponent(FyGuardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
