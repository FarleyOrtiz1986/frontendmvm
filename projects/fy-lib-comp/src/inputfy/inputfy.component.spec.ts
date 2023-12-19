import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputfyComponent } from './inputfy.component';

describe('InputfyComponent', () => {
  let component: InputfyComponent;
  let fixture: ComponentFixture<InputfyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputfyComponent]
    });
    fixture = TestBed.createComponent(InputfyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
