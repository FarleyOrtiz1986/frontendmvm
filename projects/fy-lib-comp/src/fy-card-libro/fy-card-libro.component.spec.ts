import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyCardLibroComponent } from './fy-card-libro.component';

describe('FyCardLibroComponent', () => {
  let component: FyCardLibroComponent;
  let fixture: ComponentFixture<FyCardLibroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyCardLibroComponent]
    });
    fixture = TestBed.createComponent(FyCardLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
