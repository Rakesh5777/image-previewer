import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadSectionComponent } from './image-upload-section.component';

describe('ImageUploadSectionComponent', () => {
  let component: ImageUploadSectionComponent;
  let fixture: ComponentFixture<ImageUploadSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageUploadSectionComponent]
    });
    fixture = TestBed.createComponent(ImageUploadSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
