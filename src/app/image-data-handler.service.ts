import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ImageDataHandlerService {

  private imageData: File[] = [];
  private imagePaths = new BehaviorSubject<string[]>([]);

  constructor() { }

  private validateImagesAndFilter(images: File[]): File[] {
    const supportedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp'];
    return images.filter(image => supportedTypes.includes(image.type));
  }

  public addImageData(imageData: File[]): void {
    const filteredImages = this.validateImagesAndFilter(imageData);
    if (filteredImages.length !== imageData.length && confirm('Are you sure you want to upload the selected file(s)? Non-image files will be filtered out automatically?')) {
      this.addImages(filteredImages);
    } else if (filteredImages.length === imageData.length) {
      this.addImages(filteredImages);
    }
  }

  private addImages(imageData: File[]): void {
    this.imageData = this.imageData.concat(imageData);
    this.imagePaths.next(imageData.map(image => URL.createObjectURL(image)));
  }

  public clearImageData(): void {
    this.imageData = [];
    this.imagePaths.next([]);
  }

  public getImageData(): File[] {
    return this.imageData;
  }

  public getImagePaths(): BehaviorSubject<string[]> {
    return this.imagePaths;
  }

}
