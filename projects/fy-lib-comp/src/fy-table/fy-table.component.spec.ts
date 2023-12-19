import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyTableComponent } from './fy-table.component';

describe('FyTableComponent', () => {
  let component: FyTableComponent;
  let fixture: ComponentFixture<FyTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyTableComponent]
    });
    fixture = TestBed.createComponent(FyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
