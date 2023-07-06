import { Component } from '@angular/core';
import { ImageDataHandlerService } from '../image-data-handler.service';
import { InputType } from '../models';

@Component({
  selector: 'image-upload-section',
  templateUrl: './image-upload-section.component.html',
  styleUrls: ['./image-upload-section.component.css']
})
export class ImageUploadSectionComponent {

  public inputType: InputType = 'files'

  constructor(private imageDataHandler: ImageDataHandlerService) { }

  handleImport(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.imageDataHandler.addImageData(Array.from(files));
  }

  handleDrop(event: DragEvent): void {
    event?.preventDefault();
    if (this.isFilesInput) {
      const files = event?.dataTransfer?.files as FileList;
      this.imageDataHandler.addImageData(Array.from(files));
    }
  }

  get isFilesInput(): boolean {
    return this.inputType === 'files';
  }

  get isFolderInput(): boolean {
    return this.inputType === 'folder';
  }

  get importedImagesCount(): number {
    return this.imageDataHandler.getImageData().length;

  }

}
