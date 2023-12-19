import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDropdownNabvarComponent } from './user-dropdown-nabvar.component';

describe('UserDropdownNabvarComponent', () => {
  let component: UserDropdownNabvarComponent;
  let fixture: ComponentFixture<UserDropdownNabvarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserDropdownNabvarComponent]
    });
    fixture = TestBed.createComponent(UserDropdownNabvarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
