import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyAuthComponent } from './fy-auth.component';

describe('FyAuthComponent', () => {
  let component: FyAuthComponent;
  let fixture: ComponentFixture<FyAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyAuthComponent]
    });
    fixture = TestBed.createComponent(FyAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
