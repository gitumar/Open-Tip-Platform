import { TestBed, inject } from '@angular/core/testing';

import { TipHistoryServiceService } from './tip-history-service.service';

describe('TipHistoryServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipHistoryServiceService]
    });
  });

  it('should be created', inject([TipHistoryServiceService], (service: TipHistoryServiceService) => {
    expect(service).toBeTruthy();
  }));
});
