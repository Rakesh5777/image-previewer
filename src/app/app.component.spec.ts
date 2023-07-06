import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ImagePreviewSectionComponent } from './image-preview-section/image-preview-section.component';
import { ImageUploadSectionComponent } from './image-upload-section/image-upload-section.component';
import { HeaderComponent } from './header/header.component';
import { ImageDataHandlerService } from './image-data-handler.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ImagePreviewSectionComponent,
        ImageUploadSectionComponent,
        HeaderComponent,
      ],
      providers: [
        ImageDataHandlerService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the child components', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('image-previewer-header')).toBeTruthy();
    expect(compiled.querySelector('image-upload-section')).toBeTruthy();
    expect(compiled.querySelector('image-preview-section')).toBeTruthy();
  });
});
