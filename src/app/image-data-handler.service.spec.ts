import { TestBed } from '@angular/core/testing';

import { ImageDataHandlerService } from './image-data-handler.service';

describe('ImageDataHandlerService', () => {
  let service: ImageDataHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageDataHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
