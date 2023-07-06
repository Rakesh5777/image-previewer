import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagePreviewSectionComponent } from './image-preview-section.component';
import { ImageDataHandlerService } from '../image-data-handler.service';
import { Observable, of } from 'rxjs';
import { LazyImgDirective } from '../lazy-image.directive';
import { ChangeDetectorRef } from '@angular/core';

class MockImageDataHandlerService {
  imagePaths: string[] = [];

  constructor(paths: string[]) {
    this.imagePaths = paths;
  }

  getImagePaths(): Observable<string[]> {
    return of(this.imagePaths);
  }
}

describe('ImagePreviewSectionComponent', () => {
  let component: ImagePreviewSectionComponent;
  let fixture: ComponentFixture<ImagePreviewSectionComponent>;
  let cdRef: ChangeDetectorRef;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagePreviewSectionComponent, LazyImgDirective],
      providers: [
        { provide: ImageDataHandlerService, useValue: new MockImageDataHandlerService(['1', '2']) },
      ]
    });

    fixture = TestBed.createComponent(ImagePreviewSectionComponent);
    cdRef = fixture.componentRef.injector.get(ChangeDetectorRef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should subscribe to the image data handler', () => {
    component.imagePaths = [];
    component.ngOnInit();
    expect(component.imagePaths).toEqual(['1', '2']);
  });

  it('check if placeholder is displayed if no images are uploaded', () => {
    component.imagePaths = [];
    fixture.detectChanges();
    cdRef.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.no-images-text')?.textContent).toContain('Kindly upload images to preview');
  });

  it('should clear the image paths', () => {
    const imageDataHandler = jasmine.createSpyObj('imageDataHandler', ['clearImageData']);
    imageDataHandler.clearImageData.and.returnValue(null);
    component.imageDataHandler = imageDataHandler;
    spyOn(window, 'confirm').and.callFake(function () {
      return true;
    });
    component.clearImages();

    expect(component.imagePaths).toEqual([]);
    expect(imageDataHandler.clearImageData).toHaveBeenCalled();
  });

  it('should unsubscribe from the image data handler', () => {
    component.ngOnDestroy();
    expect(component.subscription.closed).toBeTrue();
  });

  it('should render images and clear button if images are uploaded', () => {
    component.imagePaths = ['1', '2', '3'];
    fixture.detectChanges();
    cdRef.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('img').length).toEqual(3);
    expect(compiled.querySelector('button')).toBeTruthy();
  })

});
