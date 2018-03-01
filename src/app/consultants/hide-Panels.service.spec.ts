import { TestBed, inject } from '@angular/core/testing';

import { HidePanelsService } from './hide-Panels.service';

describe('HidePanelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HidePanelsService]
    });
  });

  it('should be created', inject([HidePanelsService], (service: HidePanelsService) => {
    expect(service).toBeTruthy();
  }));
});
