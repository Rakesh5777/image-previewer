import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ImageDataHandlerService } from '../image-data-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'image-preview-section',
  templateUrl: './image-preview-section.component.html',
  styleUrls: ['./image-preview-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagePreviewSectionComponent implements OnInit, OnDestroy {

  imagePaths: string[] = [];
  subscription!: Subscription;


  constructor(
    public imageDataHandler: ImageDataHandlerService,
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.imageDataHandler.getImagePaths()
      .subscribe((imagePaths) => {
        this.imagePaths = [...this.imagePaths, ...imagePaths];
        this.cd.detectChanges();
      });
  }

  clearImages(): void {
    if (confirm('Are you sure you want to clear all images?')) {
      this.imagePaths = [];
      this.imageDataHandler.clearImageData();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
