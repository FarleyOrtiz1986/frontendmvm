import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyCardTutorialComponent } from './fy-card-tutorial.component';

describe('FyCardTutorialComponent', () => {
  let component: FyCardTutorialComponent;
  let fixture: ComponentFixture<FyCardTutorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyCardTutorialComponent]
    });
    fixture = TestBed.createComponent(FyCardTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
