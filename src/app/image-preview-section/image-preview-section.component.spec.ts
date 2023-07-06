import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePreviewSectionComponent } from './image-preview-section.component';

describe('ImagePreviewSectionComponent', () => {
  let component: ImagePreviewSectionComponent;
  let fixture: ComponentFixture<ImagePreviewSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagePreviewSectionComponent]
    });
    fixture = TestBed.createComponent(ImagePreviewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
