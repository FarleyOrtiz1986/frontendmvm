import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyCardMovieComponent } from './fy-card-movie.component';

describe('FyCardMovieComponent', () => {
  let component: FyCardMovieComponent;
  let fixture: ComponentFixture<FyCardMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyCardMovieComponent]
    });
    fixture = TestBed.createComponent(FyCardMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
