import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFloatComponent } from './menu-float.component';

describe('MenuFloatComponent', () => {
  let component: MenuFloatComponent;
  let fixture: ComponentFixture<MenuFloatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuFloatComponent]
    });
    fixture = TestBed.createComponent(MenuFloatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
