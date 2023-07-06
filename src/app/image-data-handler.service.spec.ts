import { ImageDataHandlerService } from './image-data-handler.service';

describe('ImageDataHandlerService', () => {
  let service: ImageDataHandlerService;

  beforeEach(() => {
    service = new ImageDataHandlerService();
  });

  afterEach(() => {
    service.clearImageData();
  });

  it('should add image data and update image paths', () => {
    const imageData: File[] = [
      new File(['image1'], 'image1.jpg', { type: 'image/jpeg' }),
      new File(['image2'], 'image2.jpg', { type: 'image/jpeg' })
    ];

    service.addImageData(imageData);

    expect(service.getImageData()).toEqual(imageData);
    expect(service.getImagePaths().value.length).toBe(2);
  });

  it('should filter non-image files when adding image data', () => {
    const imageData: File[] = [
      new File(['image1'], 'image1.jpg', { type: 'image/jpeg' }),
      new File(['text'], 'file.txt', { type: 'text/plain' })
    ];

    spyOn(window, 'confirm').and.returnValue(true);
    service.addImageData(imageData);

    expect(service.getImageData().length).toBe(1);
    expect(service.getImageData()[0].name).toBe('image1.jpg');
    expect(service.getImagePaths().value.length).toBe(1);
  });

  it('should clear image data and update image paths', () => {
    const imageData: File[] = [
      new File(['image1'], 'image1.jpg', { type: 'image/jpeg' }),
      new File(['image2'], 'image2.jpg', { type: 'image/jpeg' })
    ];

    service.addImageData(imageData);
    service.clearImageData();

    expect(service.getImageData().length).toBe(0);
    expect(service.getImagePaths().value.length).toBe(0);
  });

  it('should return the correct image paths', () => {
    const imageData: File[] = [
      new File(['image1'], 'image1.jpg', { type: 'image/jpeg' }),
      new File(['image2'], 'image2.jpg', { type: 'image/jpeg' })
    ];

    service.addImageData(imageData);

    expect(service.getImagePaths().value.length).toBe(2);
    expect(service.getImagePaths().value[0]).toContain('blob:');
    expect(service.getImagePaths().value[1]).toContain('blob:');
  });
});
