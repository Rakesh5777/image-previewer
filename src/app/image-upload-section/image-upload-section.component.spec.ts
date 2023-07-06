import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadSectionComponent } from './image-upload-section.component';
import { ImageDataHandlerService } from '../image-data-handler.service';

describe('ImageUploadSectionComponent', () => {
  let component: ImageUploadSectionComponent;
  let fixture: ComponentFixture<ImageUploadSectionComponent>;
  let imageHandlingService: ImageDataHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageUploadSectionComponent],
      providers: [ImageDataHandlerService]
    });
    fixture = TestBed.createComponent(ImageUploadSectionComponent);
    imageHandlingService = TestBed.inject(ImageDataHandlerService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('check if folder type input toggle is working ', () => {
    component.inputType = 'files';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    compiled.querySelector('#folder').click();
    fixture.detectChanges();
    const highlight = compiled.querySelector('.highlight');
    expect(highlight.textContent).toContain('Choose folder');
    expect(component.inputType).toEqual('folder');
  });

  it('check if file type input toggle is working ', () => {
    component.inputType = 'folder';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    compiled.querySelector('#files').click();
    fixture.detectChanges();
    const highlight = compiled.querySelector('.highlight');
    expect(highlight.textContent).toContain('Browse');
    expect(component.inputType).toEqual('files');
  });

  it('check if imported images count is rendering correctly', () => {
    const tempFiles = [
      new File([''], 'test1.jpg', { type: 'image/jpeg' }),
      new File([''], 'test2.jpg', { type: 'image/jpeg' }),
    ]
    imageHandlingService.addImageData(tempFiles);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const importedImagesCount = compiled.querySelector('.imported-count .highlight');
    expect(importedImagesCount.textContent).toContain('2');
  });

  it('should have selected class for selected input type', () => {
    component.inputType = 'folder';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const folderInput = compiled.querySelector('#folder');
    expect(folderInput.classList).toContain('selected');
    const fileInput = compiled.querySelector('#files');
    expect(fileInput.classList).not.toContain('selected');
  });

  it('check if file import is working properly', () => {
    component.inputType = 'files';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const fileInput = compiled.querySelector('#import');
    fileInput.click();
    fixture.detectChanges();
    const tempFiles = [
      new File([''], 'test1.jpg', { type: 'image/jpeg' }),
      new File([''], 'test2.jpg', { type: 'image/jpeg' }),
    ]
    const mockEvent: any = {
      target: {
        files: tempFiles
      }
    }
    component.handleImport(mockEvent);
    fixture.detectChanges();
    expect(imageHandlingService.getImageData().length).toEqual(2);
  });

  it('should call the handleImport method on file selection', () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    const inputElement = fixture.nativeElement.querySelector('input[type="file"]');
    spyOn(component, 'handleImport');
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { files: [file] } });
    inputElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.handleImport).toHaveBeenCalledWith(event);
  });

  it('should call the handleDrop method on drag event', () => {
    component.inputType = 'files';
    fixture.detectChanges();
    const file = new File([''], 'test.png', { type: 'image/png' });
    const uploadSection = fixture.nativeElement.querySelector('.upload-section');
    spyOn(component, 'handleDrop');
    spyOn(imageHandlingService, 'addImageData');
    const event: any = new Event('drop');
    Object.defineProperty(event, 'dataTransfer', { value: { files: [file] } });
    uploadSection.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.handleDrop).toHaveBeenCalledWith(event);
  });

});
