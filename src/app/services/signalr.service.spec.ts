import { TestBed } from '@angular/core/testing';

import { SignalRService } from './signalr.service';

describe('SignalrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignalRService = TestBed.get(SignalRService);
    expect(service).toBeTruthy();
  });
});
