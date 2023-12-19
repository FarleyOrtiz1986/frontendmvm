import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FyUploadFileComponent } from './fy-upload-file.component';

describe('FyUploadFileComponent', () => {
  let component: FyUploadFileComponent;
  let fixture: ComponentFixture<FyUploadFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FyUploadFileComponent]
    });
    fixture = TestBed.createComponent(FyUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
