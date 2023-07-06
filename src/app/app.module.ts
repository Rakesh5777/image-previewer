import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ImageUploadSectionComponent } from './image-upload-section/image-upload-section.component';
import { ImagePreviewSectionComponent } from './image-preview-section/image-preview-section.component';
import { ImageDataHandlerService } from './image-data-handler.service';
import { LazyImgDirective } from './lazy-image.directive';
import { LazyLoadImageModule } from 'ng-lazyload-image';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImageUploadSectionComponent,
    ImagePreviewSectionComponent,
    LazyImgDirective
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    LazyLoadImageModule
  ],
  providers: [ImageDataHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
