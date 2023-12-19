import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyCardCourseComponent } from './fy-card-course.component';

describe('FyCardCourseComponent', () => {
  let component: FyCardCourseComponent;
  let fixture: ComponentFixture<FyCardCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyCardCourseComponent]
    });
    fixture = TestBed.createComponent(FyCardCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
